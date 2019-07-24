drop table if exists users cascade;
drop table if exists reservations cascade;
drop table if exists property_reviews cascade;
drop table if exists properties cascade;


create table users (
  id serial primary key,
  name varchar(255) not null,
  email varchar(255) not null,
  password varchar(255) not null
);

create table properties (
  id serial primary key,
  owner_id integer not null references users(id) on delete cascade,
  title varchar(255) not null,
  description text not null,
  thumbnail_photo_url text not null,
  cover_photo_url  text not null,
  cost_per_night decimal not null,
  parking_spaces smallint not null,
  number_of_bathrooms smallint not null,
  number_of_bedrooms smallint not null,
  country text not null,
  street text not null,
  city text not null,
  provence text not null,
  post_code text not null,
  active boolean not null
);

create table reservations (
  id serial primary key,
  start_date date not null,
  end_date date not null,
  property_id integer not null references properties(id) on delete cascade,
  guest_id integer not null references users(id) on delete cascade
);

create table property_reviews (
  id serial primary key,
  guest_id integer not null references users(id) on delete cascade,
  reservation_id integer not null references reservations(id) on delete cascade,
  property_id integer not null references properties(id) on delete cascade,
  rating smallint,
  message text
);

--------------------------------------------------------------------------------

