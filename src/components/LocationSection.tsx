import React, { useEffect, useState, useCallback } from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
  useApiLoadingStatus,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import { Compass, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { RESORT_CONFIG } from '../data/resortData';

const MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';

interface ResolvedPlace {
  name: string;
  address: string;
  lat: number;
  lng: number;
  googleMapsUri?: string;
}

const ResortMapInner: React.FC<{
  mapTypeId: 'roadmap' | 'hybrid';
  onPlaceResolved: (place: ResolvedPlace | null) => void;
}> = ({ mapTypeId, onPlaceResolved }) => {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const loadingStatus = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [resolvedPlace, setResolvedPlace] = useState<ResolvedPlace | null>(null);
  const [infoOpen, setInfoOpen] = useState(true);
  const [lookupError, setLookupError] = useState<string | null>(null);

  const fetchResortLocation = useCallback(async () => {
    if (!placesLib || !placesLib.Place) return;

    const queries = [
      'Aarambh Farmhouse Staycation Resort Morbe Panvel Maharashtra India',
      'Morbe, Panvel, Maharashtra, India',
    ];

    for (const textQuery of queries) {
      try {
        const { places } = await placesLib.Place.searchByText({
          textQuery,
          fields: ['displayName', 'formattedAddress', 'location', 'googleMapsURI'],
          region: 'IN',
          language: 'en',
        });

        const topPlace = places?.[0];
        if (topPlace?.location) {
          const lat =
            typeof topPlace.location.lat === 'function'
              ? topPlace.location.lat()
              : Number(topPlace.location.lat);
          const lng =
            typeof topPlace.location.lng === 'function'
              ? topPlace.location.lng()
              : Number(topPlace.location.lng);

          if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
            const placeData: ResolvedPlace = {
              name:
                textQuery.includes('Aarambh') && topPlace.displayName
                  ? topPlace.displayName
                  : RESORT_CONFIG.fullName,
              address: topPlace.formattedAddress || RESORT_CONFIG.locationFull,
              lat,
              lng,
              googleMapsUri: topPlace.googleMapsURI || undefined,
            };
            setResolvedPlace(placeData);
            onPlaceResolved(placeData);
            setLookupError(null);
            return;
          }
        }
      } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : String(err);
        if (
          errMessage.includes('OVER_QUERY_LIMIT') ||
          errMessage.includes('RESOURCE_EXHAUSTED') ||
          errMessage.includes('QuotaExceededError') ||
          errMessage.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
          setLookupError('Interactive map location quota reached. Use Get Directions below.');
          return;
        }
      }
    }

    setLookupError('Use Get Directions below for turn-by-turn navigation to Morbe, Panvel.');
  }, [placesLib, onPlaceResolved]);

  useEffect(() => {
    fetchResortLocation();
  }, [fetchResortLocation]);

  useEffect(() => {
    if (map && resolvedPlace) {
      map.panTo({ lat: resolvedPlace.lat, lng: resolvedPlace.lng });
      map.setZoom(14);
    }
  }, [map, resolvedPlace]);

  useEffect(() => {
    if (map) {
      map.setMapTypeId(mapTypeId);
    }
  }, [map, mapTypeId]);

  if (
    loadingStatus === APILoadingStatus.FAILED ||
    loadingStatus === APILoadingStatus.AUTH_FAILURE
  ) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#E8DDC8]/60 p-8 text-center">
        <MapPin className="w-8 h-8 text-[#183D2B] mb-3" strokeWidth={1.6} />
        <p className="font-serif text-2xl text-[#183D2B] mb-2">{RESORT_CONFIG.fullName}</p>
        <p className="text-sm text-[#242824]/75 max-w-sm mb-5">{RESORT_CONFIG.locationFull}</p>
        <a
          href={RESORT_CONFIG.defaultDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#183D2B] text-[#F8F5EC] text-sm font-medium hover:bg-[#23533B] transition-colors"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapId="DEMO_MAP_ID"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
        defaultZoom={5}
        mapTypeId={mapTypeId}
        gestureHandling="cooperative"
        streetViewControl={false}
        mapTypeControl={false}
        fullscreenControl={true}
        className="w-full h-full"
      >
        {resolvedPlace && (
          <>
            <AdvancedMarker
              ref={markerRef}
              position={{ lat: resolvedPlace.lat, lng: resolvedPlace.lng }}
              title={resolvedPlace.name}
              onClick={() => setInfoOpen((prev) => !prev)}
            >
              <Pin background="#183D2B" borderColor="#F8F5EC" glyphColor="#F8F5EC" scale={1.15} />
            </AdvancedMarker>

            {infoOpen && marker && (
              <InfoWindow
                anchor={marker}
                maxWidth={260}
                onCloseClick={() => setInfoOpen(false)}
              >
                <div className="p-1 text-[#242824]">
                  <p className="font-serif text-lg font-semibold text-[#183D2B] leading-snug">
                    {RESORT_CONFIG.fullName}
                  </p>
                  <p className="text-xs text-[#242824]/80 mt-1 leading-relaxed">
                    {resolvedPlace.address}
                  </p>
                  <a
                    href={resolvedPlace.googleMapsUri || RESORT_CONFIG.defaultDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#183D2B] underline mt-2 hover:text-[#607D50]"
                  >
                    <span>Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </InfoWindow>
            )}
          </>
        )}
      </GoogleMap>

      {lookupError && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#F8F5EC]/95 backdrop-blur-sm border border-[#E8DDC8] rounded-xl px-4 py-2.5 text-xs text-[#242824] shadow-sm">
          {lookupError}
        </div>
      )}
    </div>
  );
};

export const LocationSection: React.FC = () => {
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'hybrid'>('roadmap');
  const [resolvedPlace, setResolvedPlace] = useState<ResolvedPlace | null>(null);

  const directionsHref = resolvedPlace?.googleMapsUri || RESORT_CONFIG.defaultDirectionsUrl;

  return (
    <section id="location" className="bg-[#F8F5EC] py-24 lg:py-32 border-t border-[#E8DDC8]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left: Location Details & Connectivity */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-[#607D50] text-xs font-semibold tracking-[0.18em] uppercase mb-3">
                Location &amp; Directions
              </p>
              <h2 className="font-serif text-[#183D2B] text-4xl sm:text-5xl leading-[1.1] font-medium mb-6">
                Your Weekend Escape Near Panvel
              </h2>
              <p className="text-[#242824]/80 text-[15px] sm:text-base leading-[1.75] mb-8">
                Set amidst lush countryside and mountain vistas in Morbe, Panvel, Aarambh
                Farmhouse offers effortless weekend connectivity for families and groups travelling
                from Panvel, Navi Mumbai, Thane, and Mumbai.
              </p>

              {/* Address & Connectivity Hairline List */}
              <div className="divide-y divide-[#E8DDC8] border-y border-[#E8DDC8]">
                <div className="py-4 flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#183D2B] shrink-0 mt-0.5" strokeWidth={1.65} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#607D50]">
                      Resort Address
                    </p>
                    <p className="text-sm sm:text-[15px] text-[#183D2B] font-medium mt-0.5">
                      {RESORT_CONFIG.fullName}
                    </p>
                    <p className="text-sm text-[#242824]/75">
                      Morbe, Panvel, Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="py-4 flex items-start gap-3.5">
                  <Compass className="w-5 h-5 text-[#183D2B] shrink-0 mt-0.5" strokeWidth={1.65} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#607D50]">
                      Easy Weekend Access
                    </p>
                    <p className="text-sm text-[#242824]/80 mt-0.5 leading-relaxed">
                      Conveniently located near Panvel &amp; Navi Mumbai—an ideal countryside
                      staycation surrounded by scenic Sahyadri greenery and tranquil reservoir air.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#183D2B] text-[#F8F5EC] text-sm font-semibold hover:bg-[#23533B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#183D2B]"
              >
                <Navigation className="w-4 h-4" strokeWidth={1.75} />
                <span>Get Directions</span>
              </a>

              <a
                href="#booking"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-[#183D2B]/30 bg-transparent text-[#183D2B] text-sm font-semibold hover:bg-[#183D2B]/8 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#183D2B]"
              >
                Contact for Booking
              </a>
            </div>
          </div>

          {/* Right: Interactive Google Map Container */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-[#242824]/70">
                Interactive Google Map · Morbe, Panvel
              </p>
              <div className="inline-flex items-center p-1 rounded-lg bg-[#FFFFFF] border border-[#E8DDC8]">
                <button
                  type="button"
                  onClick={() => setMapTypeId('roadmap')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    mapTypeId === 'roadmap'
                      ? 'bg-[#183D2B] text-[#F8F5EC]'
                      : 'text-[#242824]/75 hover:text-[#183D2B]'
                  }`}
                >
                  Map
                </button>
                <button
                  type="button"
                  onClick={() => setMapTypeId('hybrid')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    mapTypeId === 'hybrid'
                      ? 'bg-[#183D2B] text-[#F8F5EC]'
                      : 'text-[#242824]/75 hover:text-[#183D2B]'
                  }`}
                >
                  Satellite
                </button>
              </div>
            </div>

            <div className="w-full h-[420px] lg:h-[480px] rounded-2xl overflow-hidden border border-[#E8DDC8] bg-[#E8DDC8]/50 shadow-sm">
              {MAPS_API_KEY ? (
                <APIProvider
                  apiKey={MAPS_API_KEY}
                  language="en"
                  region="IN"
                  libraries={['places', 'marker']}
                >
                  <ResortMapInner
                    mapTypeId={mapTypeId}
                    onPlaceResolved={setResolvedPlace}
                  />
                </APIProvider>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#F8F5EC] to-[#E8DDC8]">
                  <MapPin className="w-8 h-8 text-[#183D2B] mb-3" strokeWidth={1.6} />
                  <p className="font-serif text-2xl text-[#183D2B] mb-2">
                    {RESORT_CONFIG.fullName}
                  </p>
                  <p className="text-sm text-[#242824]/75 max-w-sm mb-5">
                    Morbe, Panvel, Maharashtra, India
                  </p>
                  <a
                    href={RESORT_CONFIG.defaultDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#183D2B] text-[#F8F5EC] text-sm font-medium hover:bg-[#23533B] transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
