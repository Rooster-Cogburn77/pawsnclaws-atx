"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers not showing in Next.js
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 24px;
      height: 24px;
      background-color: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const colonyIconTNR = createCustomIcon("#f59e0b"); // amber
const colonyIconNeedsTNR = createCustomIcon("#ef4444"); // red
const foodStationIcon = createCustomIcon("#22c55e"); // green

interface Colony {
  id: string;
  name: string;
  location_name: string;
  latitude: number;
  longitude: number;
  cat_count: number;
  all_tnr: boolean;
  monthly_food_cost: number;
  status: "active" | "inactive";
  description?: string;
}

interface FoodStation {
  id: string;
  name: string;
  host_business: string;
  address: string;
  latitude: number;
  longitude: number;
  needs_restock: boolean;
}

interface ColonyMapProps {
  colonies: Colony[];
  foodStations: FoodStation[];
  center: [number, number];
  selectedId: string | null;
  showColonies: boolean;
  showFoodStations: boolean;
  onMarkerClick: (id: string, lat: number, lng: number) => void;
}

// Component to handle map center changes
function MapCenterHandler({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom(), {
      duration: 0.5,
    });
  }, [center, map]);

  return null;
}

export default function ColonyMap({
  colonies,
  foodStations,
  center,
  selectedId,
  showColonies,
  showFoodStations,
  onMarkerClick,
}: ColonyMapProps) {
  // selectedId can be used in future for highlighting markers
  void selectedId;
  return (
    <MapContainer
      center={center}
      zoom={12}
      className="w-full h-full"
      style={{ minHeight: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapCenterHandler center={center} />

      {/* Colony Markers */}
      {showColonies && colonies.map((colony) => (
        <Marker
          key={colony.id}
          position={[colony.latitude, colony.longitude]}
          icon={colony.all_tnr ? colonyIconTNR : colonyIconNeedsTNR}
          eventHandlers={{
            click: () => onMarkerClick(colony.id, colony.latitude, colony.longitude),
          }}
        >
          <Popup>
            <div className="min-w-[240px]">
              <h3 className="font-bold text-gray-900 mb-1">{colony.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{colony.location_name}</p>
              <div className="flex justify-between text-sm mb-2">
                <span>🐱 {colony.cat_count} cats</span>
                <span className={colony.all_tnr ? "text-green-600" : "text-red-600"}>
                  {colony.all_tnr ? "✓ All TNR" : "⚠ Needs TNR"}
                </span>
              </div>
              {colony.description && (
                <p className="text-xs text-gray-500 mt-2">{colony.description}</p>
              )}
              <div className="mt-3 pt-3 border-t">
                <p className="text-amber-600 font-medium text-sm mb-3">
                  ${colony.monthly_food_cost / 100}/mo to sponsor
                </p>
                <div className="flex gap-2">
                  <a
                    href={`/donate?colony=${colony.id}&amount=${colony.monthly_food_cost}`}
                    className="flex-1 px-3 py-1.5 bg-amber-500 text-white text-xs font-medium rounded-lg text-center hover:bg-amber-600 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Sponsor
                  </a>
                  <a
                    href="/donate"
                    className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg text-center hover:bg-gray-200 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Donate
                  </a>
                  <a
                    href={`/volunteer?colony=${colony.id}`}
                    className="flex-1 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg text-center hover:bg-green-600 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Volunteer
                  </a>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Food Station Markers */}
      {showFoodStations && foodStations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
          icon={foodStationIcon}
        >
          <Popup>
            <div className="min-w-[180px]">
              <h3 className="font-bold text-gray-900 mb-1">{station.name}</h3>
              <p className="text-sm text-gray-600">{station.host_business}</p>
              <p className="text-sm text-gray-500">{station.address}</p>
              {station.needs_restock && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                  Needs Restock
                </span>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Empty state message in center of Austin */}
      {colonies.length === 0 && foodStations.length === 0 && (
        <Marker
          position={[30.2672, -97.7431]}
          icon={L.divIcon({
            className: "custom-marker",
            html: `<div style="
              background: white;
              padding: 12px 16px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              white-space: nowrap;
              font-size: 14px;
            ">
              <strong>Austin, TX</strong><br/>
              <span style="color: #666;">No colonies mapped yet</span>
            </div>`,
            iconSize: [150, 50],
            iconAnchor: [75, 25],
          })}
        />
      )}
    </MapContainer>
  );
}
