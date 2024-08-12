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
('skZmowShBkPAbWHUYx6It5XdXg73', 'Brenda', 'Soto', 'brendapuello@yahoo.com', '1985-10-14', 'https://res.cloudinary.com/dnqfg86zq/image/upload/t_Fill300x300/v1719864208/vcphjm5eiprxr8hwqcvk.jpg', NOW()),
('ydwn4bm1V8V78f5Ngwx9j2e6s6r1', 'Ethan', 'Soto', 'ethan@me.com', '2015-05-26', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEchmkJf4fby1ACsBewEIJJ_GC7x5YgCMhb_SARAg9nWG06J5P09n2G4hd8vlhUSqK18Q&usqp=CAU', NOW()),
('QDD97XBisEMs4i8c6lL3m0FQgLU2', 'Adam', 'Soto', 'adam@me.com', '2008-09-04', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEchmkJf4fby1ACsBewEIJJ_GC7x5YgCMhb_SARAg9nWG06J5P09n2G4hd8vlhUSqK18Q&usqp=CAU', NOW()),
('UluEED5XkIbCNtI2sSxPpgLhjOn1', 'Emalee', 'Soto', 'ema@me.com', '1999-08-15', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEchmkJf4fby1ACsBewEIJJ_GC7x5YgCMhb_SARAg9nWG06J5P09n2G4hd8vlhUSqK18Q&usqp=CAU', NOW()),
('TSiLsS0inMNMXIKzJFYWDNPOduo2', 'Anita', 'Owen', 'anita@me.com', '1988-10-19', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEchmkJf4fby1ACsBewEIJJ_GC7x5YgCMhb_SARAg9nWG06J5P09n2G4hd8vlhUSqK18Q&usqp=CAU', NOW());

INSERT INTO stats(xp, games_played, questions_correct, questions_wrong, user_id)
VALUES
   (200, 3, 8, 4, 1),
   (450, 5, 16, 4, 2),
   (275, 4, 10, 6, 3),
   (1025, 13, 41, 11, 4),
   (2375, 19, 76, 0, 5);

INSERT INTO countries(name, flag, country_code, language_code, silhouette)
VALUES
    ('France', 'https://res.cloudinary.com/dgifdj6nx/image/upload/c_scale,h_139,w_200/v1721589524/GlobalAgent-Franceflag_j3tgqr.webp', 'fr', 'fr', 'https://res.cloudinary.com/dgifdj6nx/image/upload/v1722800312/GlobalAgent-Tile-FranceNB_1_gjgm6e.png'),
    ('Mexico', 'https://res.cloudinary.com/dgifdj6nx/image/upload/c_scale,h_139,w_200/v1721589677/GlobalAgent-Mexicoflag_pat31d.gif', 'mx', 'es', 'https://res.cloudinary.com/dgifdj6nx/image/upload/v1722611809/GlobalAgent-Tile-MexicoNB_qtzvgs.webp'),
    ('Germany', 'https://res.cloudinary.com/dgifdj6nx/image/upload/c_scale,h_139,w_200/v1721419276/GlobalAgent-flag_wkgicw.gif', 'de', 'de', 'https://res.cloudinary.com/dgifdj6nx/image/upload/v1722611885/GlobalAgent-Tile-Germany_1_gazhk1.png');
    -- ('Canada', 'https://res.cloudinary.com/dgifdj6nx/image/upload/c_scale,h_139,w_200/v1721233336/GlobalAgent-flagCanadaGif_f9bbfq.gif', 'ca', 'en'),
    -- ('Australia', 'https://res.cloudinary.com/dgifdj6nx/image/upload/c_scale,h_139,w_200/v1721499418/GlobalAgent-AustraliaFlag_b1gw8n.webp', 'au', 'en');
