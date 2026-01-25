import { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "About PawsNClaws ATX - a community initiative to help Austin's animals.",
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          <p className="lead text-xl text-gray-600">
            PawsNClaws ATX started simply: someone who feeds stray cats wanted
            to help more animals and connect with others doing the same.
          </p>

          <h2>What We Are</h2>
          <p>
            We&apos;re a <strong>community resource hub</strong>, not a shelter or
            rescue. We don&apos;t have a facility, and we don&apos;t take in animals
            directly. Instead, we:
          </p>
          <ul>
            <li>
              <strong>Connect people with resources</strong> - Low-cost vets,
              pet food assistance, TNR programs
            </li>
            <li>
              <strong>Share opportunities to help</strong> - Volunteer links,
              foster programs, donation info
            </li>
            <li>
              <strong>Educate</strong> - About community cats, responsible pet
              ownership, and local services
            </li>
          </ul>

          <h2>Why Austin?</h2>
          <p>
            Austin has been a{" "}
            <strong>no-kill city since 2011</strong> - meaning our shelters
            maintain a 90%+ live outcome rate. This incredible achievement is
            only possible because of:
          </p>
          <ul>
            <li>Dedicated shelter staff and volunteers</li>
            <li>Foster families opening their homes</li>
            <li>Community members feeding and caring for strays</li>
            <li>Donors funding medical care and operations</li>
            <li>TNR programs humanely managing cat populations</li>
          </ul>
          <p>
            We want to make it easier for anyone to join this network of care.
          </p>

          <h2>Community Cats</h2>
          <p>
            A big part of what we care about is{" "}
            <strong>community cats</strong> - the ferals and strays that live in
            our neighborhoods. Austin has an estimated 70,000+ community cats.
          </p>
          <p>
            These cats are managed through{" "}
            <strong>TNR (Trap-Neuter-Return)</strong>: cats are humanely trapped,
            spayed/neutered, and returned to their colony. This stabilizes
            populations, reduces nuisance behaviors, and is more effective than
            removal.
          </p>
          <p>
            Colony caretakers - people who regularly feed and monitor community
            cats - are essential to this system. If you&apos;re feeding strays,
            you&apos;re already part of the solution.
          </p>

          <h2>Our Approach</h2>
          <div className="bg-amber-50 rounded-xl p-6 not-prose my-8">
            <blockquote className="text-xl text-amber-900 font-medium italic">
              &ldquo;We&apos;re not trying to build an empire. We just want to make it
              easier for people who care about animals to help.&rdquo;
            </blockquote>
          </div>
          <p>
            This site is intentionally simple. We&apos;d rather have accurate,
            useful information than flashy features. If a link is broken or
            info is outdated, let us know.
          </p>

          <h2>Get in Touch</h2>
          <p>
            Have a resource we should add? Found an error? Want to collaborate?
            We&apos;d love to hear from you.
          </p>
          <p>
            <em>(Contact form coming soon)</em>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/get-involved"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 rounded-full text-lg font-semibold text-white shadow-lg hover:bg-amber-600 transition-all"
          >
            Ready to Help?
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
