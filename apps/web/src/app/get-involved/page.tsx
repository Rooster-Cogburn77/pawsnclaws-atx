import { Metadata } from "next";
import Link from "next/link";
import { waysToHelp } from "@/data/ways-to-help";
import { Icon, ArrowRightIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Ways to help Austin's animals - donate, volunteer, foster, adopt, or spread the word.",
};

export default function GetInvolvedPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Get Involved</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Every action helps. Whether you have money to spare, time to give,
            or just a voice to share - there&apos;s a way for you to help
            Austin&apos;s animals.
          </p>
        </div>

        {/* Time commitment filter hint */}
        <div className="mb-8 text-center">
          <span className="text-sm text-gray-500">
            From one-time actions to regular commitments - find what works for
            you
          </span>
        </div>

        {/* Ways to Help Grid */}
        <div className="space-y-8">
          {waysToHelp.map((way) => (
            <section
              key={way.id}
              id={way.id}
              className="p-6 md:p-8 bg-white rounded-2xl border border-gray-200 hover:border-amber-200 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Icon & Title */}
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Icon name={way.icon} className="w-7 h-7 text-amber-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {way.title}
                    </h2>
                    <CommitmentBadge level={way.commitment} />
                  </div>
                  <p className="text-gray-600 mb-6">{way.description}</p>

                  {/* Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {way.actions.map((action, i) => (
                      <ActionCard key={i} action={action} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Not sure section */}
        <div className="mt-12 p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-gray-900">Not Sure Where to Start?</h3>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            That&apos;s okay! The easiest first step is just sharing. Next time you
            see an adoptable pet post, share it. You never know who might be
            looking.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resources"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-full font-medium text-gray-900 shadow-md hover:shadow-lg transition-all"
            >
              Browse Resources
            </Link>
            <a
              href="https://www.austintexas.gov/services/adopt-a-pet"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 rounded-full font-medium text-white shadow-md hover:bg-amber-600 transition-all"
            >
              See Adoptable Pets
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommitmentBadge({ level }: { level: "one-time" | "occasional" | "regular" }) {
  const styles = {
    "one-time": "bg-green-100 text-green-700",
    occasional: "bg-blue-100 text-blue-700",
    regular: "bg-purple-100 text-purple-700",
  };

  const labels = {
    "one-time": "One-time",
    occasional: "Occasional",
    regular: "Regular",
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[level]}`}>
      {labels[level]}
    </span>
  );
}

function ActionCard({
  action,
}: {
  action: {
    label: string;
    description: string;
    link?: string;
    linkType?: string;
  };
}) {
  const content = (
    <div className="p-4 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors h-full">
      <div className="font-medium text-gray-900">{action.label}</div>
      <div className="mt-1 text-sm text-gray-600">{action.description}</div>
      {action.link && (
        <div className="mt-2 text-sm text-amber-600 font-medium flex items-center gap-1">
          Visit
          <ArrowRightIcon className="w-3 h-3" />
        </div>
      )}
    </div>
  );

  if (action.link) {
    return (
      <a
        href={action.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
