import Link from "next/link";

export const metadata = {
  title: "Pet Emergency Preparedness | PawsNClaws ATX",
  description: "Be prepared for emergencies with your pets. Disaster planning, evacuation tips, and emergency contacts for Austin pet owners.",
};

const emergencyContacts = [
  { name: "Austin Animal Center", phone: "(512) 978-0500", note: "City shelter, 24/7 for emergencies" },
  { name: "Austin 311", phone: "311", note: "Report stray animals, animal emergencies" },
  { name: "Animal Poison Control (ASPCA)", phone: "(888) 426-4435", note: "24/7, fee may apply" },
  { name: "Texas Veterinary Medical Assoc", phone: "(512) 452-4224", note: "Find emergency vets" },
];

const emergencyVets = [
  { name: "Austin Vet Emergency & Specialty", address: "7300 Ranch Road 2222", phone: "(512) 343-2837", hours: "24/7" },
  { name: "Emergency Pet Care of Texas", address: "8012 Brodie Ln", phone: "(512) 899-0955", hours: "24/7" },
  { name: "Heart of Texas Veterinary Specialty", address: "3309 Executive Dr, Round Rock", phone: "(512) 255-1515", hours: "24/7" },
];

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">🚨</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pet Emergency Preparedness
          </h1>
          <p className="text-gray-600">
            Be prepared to keep your pets safe during emergencies and disasters.
          </p>
        </div>

        {/* Emergency Contacts */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📞</span> Emergency Contacts
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {emergencyContacts.map((contact, idx) => (
              <div key={idx} className={`p-4 flex justify-between items-center ${idx > 0 ? "border-t" : ""}`}>
                <div>
                  <p className="font-medium text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.note}</p>
                </div>
                <a
                  href={`tel:${contact.phone.replace(/\D/g, "")}`}
                  className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 24/7 Emergency Vets */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🏥</span> 24/7 Emergency Veterinarians
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {emergencyVets.map((vet, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-5">
                <h3 className="font-bold text-gray-900 mb-2">{vet.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{vet.address}</p>
                <p className="text-sm text-green-600 font-medium mb-3">{vet.hours}</p>
                <a
                  href={`tel:${vet.phone.replace(/\D/g, "")}`}
                  className="text-red-600 font-medium hover:underline"
                >
                  {vet.phone}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Kit */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎒</span> Pet Emergency Kit Checklist
          </h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 mb-4">
              Keep these items ready in a waterproof container you can grab quickly:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Food & Water</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>3-7 days of food in airtight container</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Bottled water (at least 3 days)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Collapsible food/water bowls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Manual can opener (if wet food)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Medical</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>2 weeks of medications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Vaccination records copy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>First aid kit (gauze, tape, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Vet contact info</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-3">ID & Documents</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Recent photos of your pet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Microchip number & registry info</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Proof of ownership/adoption papers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Extra collar with ID tag</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Supplies</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Carrier or crate (labeled)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Leash and harness</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Cat litter & disposable pan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Poop bags, paper towels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1 rounded" />
                    <span>Familiar toy or blanket</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Evacuation Tips */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🚗</span> Evacuation Tips
          </h2>
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-bold text-amber-900 mb-2">Never Leave Pets Behind</h3>
              <p className="text-sm text-amber-800">
                If it&apos;s not safe for you to stay, it&apos;s not safe for your pets. Most emergency shelters
                don&apos;t accept pets, so have a plan for pet-friendly hotels, friends/family outside the area,
                or emergency boarding facilities.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h3 className="font-bold text-blue-900 mb-2">Plan Multiple Routes</h3>
              <p className="text-sm text-blue-800">
                Know at least two evacuation routes from your home. Practice getting your pet into their
                carrier quickly - this can save crucial time during an emergency.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-bold text-green-900 mb-2">Buddy System</h3>
              <p className="text-sm text-green-800">
                Exchange keys with a trusted neighbor and discuss emergency pet care plans.
                If you&apos;re away when disaster strikes, someone should be able to evacuate your pets.
              </p>
            </div>
          </div>
        </section>

        {/* Austin-Specific Info */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>📍</span> Austin-Specific Resources
          </h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-amber-500">•</span>
                <div>
                  <strong>Austin HSEM (Homeland Security & Emergency Management):</strong>{" "}
                  <a href="https://www.austintexas.gov/department/homeland-security-and-emergency-management" className="text-amber-600 hover:underline">
                    austintexas.gov/hsem
                  </a> - Sign up for emergency alerts
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500">•</span>
                <div>
                  <strong>Warn Central Texas:</strong> Text ATXFLOOD to 888777 for flood warnings
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500">•</span>
                <div>
                  <strong>Pet-Friendly Shelters:</strong> During major evacuations, Austin often opens pet-friendly
                  shelters. Monitor local news and city announcements.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500">•</span>
                <div>
                  <strong>Common Austin Emergencies:</strong> Floods, severe storms, extreme heat, ice storms,
                  and wildfires. Have plans for each scenario.
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-red-100 border border-red-200 rounded-xl p-6 text-center">
          <h3 className="font-bold text-red-900 mb-2">
            Having a Pet Emergency Right Now?
          </h3>
          <p className="text-sm text-red-800 mb-4">
            If your pet needs immediate help, don&apos;t wait. Call an emergency vet or Animal Poison Control.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:8884264435"
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
            >
              Poison Control: (888) 426-4435
            </a>
            <Link
              href="/resources#emergency"
              className="px-6 py-3 bg-white text-red-700 font-bold rounded-xl border-2 border-red-600 hover:bg-red-50 transition-colors"
            >
              Find Emergency Vet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
