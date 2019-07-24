-- delete from users;
-- delete from reservations;
-- delete from property_reviews;
-- delete from properties;



insert into users (name, email, password)
values ('Honoka Kousaka', 'superman@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kotori', 'spiderman@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Umi', 'ninja@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

insert into properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
values (1, 'Kotori housing', 'you get to stay with Kotori',
  'https://i.schoolido.lu/c/1454idolizedKotori.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Gingerbread_House_Essex_CT.jpg/220px-Gingerbread_House_Essex_CT.jpg',
  180, 5, 100, 0, 'Canada', 'King St', 'Toronto', 'ON', 'M4C3E3', true);

insert into reservations (start_date, end_date, property_id, guest_id)
values ('01-02-2020', '09-03-2020', 1, 3);

insert into property_reviews (guest_id, reservation_id, property_id, rating, message)
values (1, 1, 1, 5, 'good times');