-- you do not need to seed users
-- you should run 'npm run db:init' to initialize the database
-- start your front and backends
-- instead now you should create users with firebase that will register also to your backend
-- when seeding other fields in other tables and you need the foreign key of user Id, retrieve the userIds from looking on postico or using psql
-- SELECT * from users 
-- manually place the id into your INSERT INTO values

\c global_agent

INSERT INTO users(uid, first_name, last_name, email, dob, photo, created_at)
VALUES
('skZmowShBkPAbWHUYx6It5XdXg73', 'Brenda', 'Soto', 'brendapuello@yahoo.com', '1985-10-14', 'https://res.cloudinary.com/dnqfg86zq/image/upload/t_Fill300x300/v1719864208/vcphjm5eiprxr8hwqcvk.jpg', NOW());

INSERT INTO stats(xp, games_played, questions_correct, questions_wrong, user_id)
VALUES
   (200, 3, 8, 4, 1);
--    (450, 5, 16, 4, 2);

-- INSERT INTO badges(name, image, description, xp_required)
-- VALUES
--     ('Rookie Detective', 'https://i.pinimg.com/originals/df/f8/89/dff8895acae6e7f29d175c9629ecea31.jpg', 'Rookie Investigator badge', 0),
--     ('Junior Investigator badge', 'https://media.istockphoto.com/id/599282176/vector/gold-realistic-police-detective-vector-badge-with-shield.jpg?s=612x612&w=0&k=20&c=LQNuz4gKYVi94yORQ5_K-ZFgRCCOqt6dnPjo6_uSYME=', 'Junior Investigator', 500),
--     ('Gumshoe', 'https://media.gettyimages.com/id/481775549/zh/%E5%90%91%E9%87%8F/cowboy-cameo.jpg?s=612x612&w=0&k=20&c=QqQDKneOPDz8Rmh_XQpiXhFOIizQKubHrliivUBHPRg=', 'Gumshoe badge', 1300),
--     ('Chief Detective', 'https://cdn.imgbin.com/24/13/24/imgbin-police-officer-badge-special-police-police-academy-yellow-shield-ryy4BGDZBi2xePLGFgqHHAiP4.jpg', 'Chief Detective badge', 2800),
--     ('Master Sleuth', 'https://cdn11.bigcommerce.com/s-yumff8kfnk/images/stencil/1280x1280/products/8454/14697/4623WCG-front__03109.1680643153.jpg?c=1', 'Master Sleuth badge', 5000);

INSERT INTO countries(name, flag)
VALUES
    -- ('Bolivia', '🇧🇴'),
    ('China', 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1719945542/download_3_xdtw9a.png'),
    ('Dominican Republic', 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1719945529/download_1_ey5dxy.png'),
    ('Portugal', 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1719945536/download_2_wosmqd.png'),
    ('Trinidad and Tobago', 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1719945522/download_w0sugs.png');

-- INSERT INTO user_badges(badge_id, user_id)
-- VALUES
--     (1, 1);
--     -- (1, 2);

-- INSERT INTO visited_countries(countries_id, user_id)
-- VALUES
--     (2, 1);
--     -- (5, 2);

INSERT INTO case_files(article_title, article_content, countries_id)
VALUES
    ('Fighting in Ukraine May Complicate U.S. Thaw With Russia', 'MOSCOW — The war in eastern Ukraine that simmered quietly for months has erupted in a lethal bout of fighting in recent days. The violence, which killed at least eight Ukrainian soldiers and three on the pro-Russian side, shifted the front lines by only a few hundred yards in several spots, but potentially complicates American efforts to improve relations with Russia. The United States Army helps to train and equip Ukrainian soldiers, who are fighting Russian-backed separatists in two eastern provinces of Ukraine, in the only active war in Europe today. In the latest outbreak, the sides vied for control of what are known as “gray zone” territories, areas between the front lines that had previously been in buffer zones. The Ukrainian Army advanced in at least two places, according to news reports and official Ukrainian accounts, but it said it did so to rebuff rebel attacks. Each side blamed the other for the escalation. Referring to one front-line town, an adviser to the Ukrainian Interior Ministry, Yuri Kasyanov, told Radio Free Europe on Tuesday, “The defenders of Avdiivka preferred to advance the line” to a more defensible position. Ukraines Foreign Affairs Ministry issued a statement appealing to Western governments to intervene diplomatically. “For the last two days, the Russian occupation forces carried out massive attacks across the line,” firing with rocket artillery, heavy mortars and other long-range weapons, the statement said. European monitors reported heavy shelling of Avdiivka since Sunday. Journalists who visited the town reported evidence of a psychological warfare operation of a sophistication that suggested Russian involvement. Cellphones in the town received text messages addressed to Ukrainian soldiers, who often carry phones, saying, “You are just meat to your commanders.” The shelling disrupted electrical and water supplies. The Ukrainian authorities set up heated shelters for residents whose homes had been damaged, as nighttime temperatures dropped to minus 18 degrees Fahrenheit (minus 28 Celsius). “Given harsh weather conditions and the continuing shelling by the militants, the humanitarian situation in the area continues to deteriorate,” the Foreign Affairs Ministrys statement said. The authorities said they were preparing to evacuate the towns 16,000 residents. The rebel governments of the Luhansk and Donetsk Peoples Republics, which are not recognized internationally, issued a joint statement addressed to President Vladimir V. Putin of Russia and President Trump that also called for a diplomatic solution. The Trump administrations maneuvering for better relations with Russia has alarmed Ukrainian officials, who fear that Western pressure could ease on Russia to withdraw its unacknowledged military forces in eastern Ukraine. But Ukraine is not without options in defending itself, including using its army, which showed an ability to fight even before American training began. Since the so-called line of contact was initially negotiated in a cease-fire in September 2014, the Ukrainian Army has in places given ground after separatist attacks. With its recent advance, the army moved back into at least one such area, near Avdiivka, without crossing the original cease-fire line, Mr. Kasyanov, the adviser to the Interior Ministry, said.', 1),
    ('Known terrorist spent year in US after being wrongly released by feds — and GOP lawmakers demand answers', 'A Somali terrorist was allowed into the country and was able to operate freely for almost a year before authorities realized their error and rearrested him. Republican lawmakers are demanding information from Homeland Security Secretary Alejandro Mayorkas about what happened to the man — and whether US citizens funded any part of his journey to or stay in the US. The 27-year-old Somalian — who so far has not been identified by name — was on the watchlist as “a confirmed member of al Shabaab” involved in the use, manufacture or transportation of explosives or firearms, but a border bungle meant he was released after initially being arrested for crossing into the country illegally in California in March 2023. A letter from Republican lawmakers seeks to find the al-Shabaab members path from illegally crossing the border to Minnesota, were he was eventually rearrested in January, and whether he received any government benefits. It also seeks to find if he took a commercial flight with US citizens to reach their state and if his travel was funded with taxpayer dollars, according to the Tuesday letter, first obtained by The Post. The letter states: “Due to Minnesotas far distance from the border, it is not an easy task for migrants to travel to the state … “Did the al-Shabbab terrorist travel to Minnesota with the assistance, either direct or indirect of an [Non-Governmental Organization]? If so, which NGO was responsible for transporting the individual to Minnesota?” The terrorist organization member had initially crossed into California and been arrested by the Border Patrol. However, the Terrorist Screening Center determined he was a “mismatch” to the terror watchlist, leading to his release. Nearly a year later, Immigration and Customs Enforcement (ICE) nabbed him after federal authorities made a “redetermination” and realized he was associated with the Somalian militant group. Al-Shabaab was formed as the militant wing of the Somali Council of Islamic Courts, which controlled the southern part of the country in late 2006. Its rule was defeated in 2007, according to the Office of the Director of National Intelligence, but it has since operated as an underground network and is involved in wars in and around Somalia. It was designated a terrorist organization in 2008 by the US government and is notorious for carrying out bombings and suicide attacks. In 2013, al-Shabaab was responsible for a massacre at the Westgate mall in Kenya, killing 67 individuals. US forces have conducted six strikes in Somalia against al-Shabaab already this year, killing two dozen militants in the latest actions, according to CNN. In a February press conference, ICE Acting Director Patrick Lechleitner said his agency arrested the individual “within 48 hours” of learning his true identity. “The Biden administrations open-borders agenda allowed a known terrorist to roam freely throughout our state, and now they must answer for their inexcusable negligence,” House Majority Whip Tom Emmer (R-Minn.) said in a statement to The Post regarding the probe. The Border Patrol has recorded an ever-growing number of migrants listed on the terror watchlist attempting to enter the US illegally in recent years. Between October 2023 and February, agents have already recorded 70 encounters at both the southern and northern borders, according to federal data. There were 172 such encounters recorded in fiscal year 2023, which ran from October 2022 to September 2023, 98 in fiscal year 2022, 16 in fiscal year 2021 and 14 between fiscal years 2017 and 2020. In March, Border Patrol agents apprehended Lebanese national Basel Bassel Ebbadi, 22, who told personnel that he came to the US “to try to make a bomb,” according to internal federal documents first obtained by The Post. Ebbadi admitted to a border agent that he is a member of Hezbollah and was later confirmed as a “positive match” on the terror watchlist.', 2);

INSERT INTO questions_younger(question, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3, case_files_id)
VALUES
    ('Where is the current war taking place?', 'Eastern Ukraine', 'Western Russia', 'Northern Poland', 'Southern Finland', 1),
    ('How many Ukrainian soldiers were reported killed in the recent fighting?', 'At least 8', 'Over 100', 'None', 'Exactly 50', 1),
    ('What is the current nighttime temperature in the affected area?', 'Minus 18 degrees Fahrenheit', '75 degrees Fahrenheit', '32 degrees Fahrenheit', '00 degrees Fahrenheit', 1),
    ('Who is training and equipping Ukrainian soldiers?', 'The United States Army', 'The Chinese military', 'The Brazilian air force', 'The Australian navy', 1);

INSERT INTO questions_older(question, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3, case_files_id)
VALUES
    ('What recent event has complicated US efforts to improve relations with Russia?', 'An eruption of fighting in eastern Ukraine', 'A peace treaty signed between Ukraine and Russia', 'The discovery of oil in the Black Sea', 'The discovery of oil in the Black Sea', 1),
    ('What are "gray zone" territories in this conflict?', 'Areas between front lines that were previously buffer zones', 'Regions with unclear political allegiance', 'Zones where no fighting is allowed', 'Territories controlled by UN peacekeepers', 1),
    ('How have Ukrainian authorities responded to the humanitarian crisis in Avdiivka?', 'Setting up heated shelters and preparing for evacuation', 'Closing all borders and declaring martial law', 'Requesting direct military intervention from NATO', 'Surrendering the town to separatist forces', 1),
    ('What concern do Ukrainian officials have about US-Russia relations?', 'Western pressure on Russia to withdraw from eastern Ukraine might ease', 'The US might join Russia in supporting the separatists', 'Russia might increase its military presence in Ukraine', 'The US might stop all diplomatic relations with Ukraine', 1);

