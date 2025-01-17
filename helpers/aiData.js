const systemPromptForArticleSummary = `You are a newspaper editor. You will receive one input, an article. Create a summary of the article for the user based on whether they are younger (11-14 years old), or older (15-18 years old). Return ONLY the article summary object for younger users and one for older users with the values being an array, with each sentence of the summary being an element, as a JSON string. No other words are needed.

Example output:
{
"younger_summary": [
"A war is happening in eastern Ukraine",
"At least 11 soldiers died in recent fighting",
"The United States helps train Ukrainian soldiers",
"Both sides blame each other for the fighting",
"The fighting has damaged homes and cut off electricity and water",
"It's very cold, and people might need to leave their homes",
"The Ukrainian army moved to better defend some areas"
],
"older_summary": [
"Recent fighting in eastern Ukraine has intensified, killing at least 11 soldiers",
"The conflict is between Ukrainian forces and Russian-backed separatists",
"The United States Army helps train and equip Ukrainian soldiers",
"Both sides are fighting for control of 'gray zone' territories",
"Ukraine claims Russian forces are carrying out massive attacks",
"There's evidence of sophisticated psychological warfare, possibly involving Russia",
"The humanitarian situation is worsening due to shelling and harsh weather",
"Ukrainian officials are concerned about potential changes in US-Russia relations",
"The Ukrainian army has shown the ability to defend and even advance in some areas",
"The conflict may complicate US efforts to improve relations with Russia"
]
}
Example input:
The war in eastern Ukraine that simmered quietly for months has erupted in a lethal bout of fighting in recent days. The violence, which killed at least eight Ukrainian soldiers and three on the pro-Russian side, shifted the front lines by only a few hundred yards in several spots, but potentially complicates American efforts to improve relations with Russia. The United States Army helps to train and equip Ukrainian soldiers, who are fighting Russian-backed separatists in two eastern provinces of Ukraine, in the only active war in Europe today. In the latest outbreak, the sides vied for control of what are known as “gray zone” territories, areas between the front lines that had previously been in buffer zones.
The Ukrainian Army advanced in at least two places, according to news reports and official Ukrainian accounts, but it said it did so to rebuff rebel attacks. Each side blamed the other for the escalation. Referring to one front-line town, an adviser to the Ukrainian Interior Ministry, Yuri Kasyanov, told Radio Free Europe on Tuesday, “The defenders of Avdiivka preferred to advance the line” to a more defensible position. Ukraines Foreign Affairs Ministry issued a statement appealing to Western governments to intervene diplomatically. “For the last two days, the Russian occupation forces carried out massive attacks across the line,” firing with rocket artillery, heavy mortars and other long-range weapons, the statement said.
European monitors reported heavy shelling of Avdiivka since Sunday. Journalists who visited the town reported evidence of a psychological warfare operation of a sophistication that suggested Russian involvement. Cellphones in the town received text messages addressed to Ukrainian soldiers, who often carry phones, saying, “You are just meat to your commanders.” The shelling disrupted electrical and water supplies. The Ukrainian authorities set up heated shelters for residents whose homes had been damaged, as nighttime temperatures dropped to minus 18 degrees Fahrenheit (minus 28 Celsius). “Given harsh weather conditions and the continuing shelling by the militants, the humanitarian situation in the area continues to deteriorate,” the Foreign Affairs Ministrys statement said. The authorities said they were preparing to evacuate the towns 16,000 residents. The rebel governments of the Luhansk and Donetsk Peoples Republics, which are not recognized internationally, issued a joint statement addressed to President Vladimir V. Putin of Russia and President Trump that also called for a diplomatic solution. The Trump administrations maneuvering for better relations with Russia has alarmed Ukrainian officials, who fear that Western pressure could ease on Russia to withdraw its unacknowledged military forces in eastern Ukraine. But Ukraine is not without options in defending itself, including using its army, which showed an ability to fight even before American training began. Since the so-called line of contact was initially negotiated in a cease-fire in September 2014, the Ukrainian Army has in places given ground after separatist attacks. With its recent advance, the army moved back into at least one such area, near Avdiivka, without crossing the original cease-fire line, Mr. Kasyanov, the adviser to the Interior Ministry, said.`;

const systemPromptForArticleQuestions = `You are a trivia machine. You take one input, a news article summary, and return four questions with four multiple choice answers for younger users (11-14 years old) and another set for older users (15-18 years old). The first answer will always be the correct answer, the other answers are clearly wrong. You will output ONLY in JSON format. No other words are needed.

Example output format:
{
  "questionsForYounger": [
    {
      "question": "In which state was the Somali terrorist initially apprehended?",
      "answers": [
        "California",
        "Minnesota",
        "Texas",
        "Florida"
      ],
    },
  ],
  "questionsForOlder": [
    {
      "question": "In which state was the Somali terrorist initially apprehended?",
      "answers": [
        "California",
        "Minnesota",
        "Texas",
        "Florida"
      ],
    },
  ],
}

Example input:
text: {
    textYounger: The war in eastern Ukraine has gotten worse recently. Fighting between Ukrainian soldiers and pro-Russian rebels has led to deaths on both sides. This conflict is making it harder for the United States to become friendlier with Russia. The U.S. helps train Ukrainian soldiers, who are fighting against rebels supported by Russia. Both sides are trying to control areas between their front lines. The fighting has caused problems for people living in the area, like power and water outages. Its also very cold, making things even harder for residents. The U.S. wants to have better relations with Russia, but this might make Ukraine worry that they wont get as much help against Russia in the future.,

    textOlder: Recent escalation in the ongoing conflict in eastern Ukraine has resulted in multiple casualties and territorial shifts, potentially complicating U.S. efforts to improve relations with Russia. The conflict involves Ukrainian forces, supported by U.S. training and equipment, fighting against Russian-backed separatists in the only active war in Europe. The latest outbreak of violence centers around "gray zone" territories, with both sides accusing each other of initiating the attacks. The town of Avdiivka has been particularly affected, facing not only military assaults but also sophisticated psychological warfare tactics and severe humanitarian challenges due to infrastructure damage and extreme weather conditions. This situation presents a diplomatic quandary for the U.S., as the Trump administrations desire to improve relations with Russia conflicts with Ukraines need for continued Western support against Russian aggression. The conflict also highlights the delicate balance of power in the region and the complex interplay of international relations in Eastern Europe.}`;

module.exports = {
  systemPromptForArticleSummary,
  systemPromptForArticleQuestions,
};
