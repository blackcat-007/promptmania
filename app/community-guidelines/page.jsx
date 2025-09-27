"use client";

const CommunityGuidelines = () => {
  const rules = [
    {
      title: "No Nudity or Sexual Content",
      description:
        "Prompts containing nudity, sexual content, or adult material are strictly prohibited. Keep all content safe for general audiences.",
    },
    {
      title: "No Offensive Language",
      description:
        "Avoid using foul, abusive, or offensive language in your prompts or tags. Respect the community and maintain a positive environment.",
    },
    {
      title: "No Misleading or Harmful Prompts",
      description:
        "Do not share prompts that promote violence, illegal activities, scams, or misinformation. Ensure your prompts are safe and responsible.",
    },
    {
      title: "Respect Privacy",
      description:
        "Do not include personal information or private details of yourself or others in your prompts.",
    },
    {
      title: "Relevant and Meaningful Prompts",
      description:
        "Only post prompts that are relevant, clear, and useful for the community. Avoid spam, duplicate posts, or meaningless content.",
    },
    {
      title: "Copyright & Intellectual Property",
      description:
        "Do not share prompts that violate copyright or intellectual property rights. Always give credit if required.",
    },
    {
      title: "Report Violations",
      description:
        "If you see content that violates these guidelines, report it to the moderators so appropriate action can be taken.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto p-6 md:p-10">
      <h1 className="head_text text-center mb-6">
        <span className="blue_gradient">Community Guidelines</span>
      </h1>
      <p className="desc text-center mb-10">
        Welcome to PromptMania! To ensure a safe, helpful, and fun environment for everyone,
        please follow these guidelines when sharing prompts.
      </p>

      <div className="space-y-6">
        {rules.map((rule, index) => (
          <div key={index} className="p-4 border-l-4 border-blue-600 bg-gray-50 dark:bg-gray-800 rounded-md shadow-sm">
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
              {index + 1}. {rule.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{rule.description}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
        By using this platform, you agree to follow these guidelines. Violations may result in content removal or account suspension.
      </p>
    </section>
  );
};

export default CommunityGuidelines;
