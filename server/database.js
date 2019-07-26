const { Pool } = require('pg')
const pool = new Pool ({
  user: 'vagrant',
  host: 'localhost',
  database: 'lightbnb',
  password: 'vagrant'
});



const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
//   let user;
//   for (const userId in users) {
//     user = users[userId];
//     if (user.email.toLowerCase() === email.toLowerCase()) {
//       break;
//     } else {
//       user = null;
//     }
//   }
//   return Promise.resolve(user);


  const queryString = `
    SELECT * FROM users
    where email = $1;
    `;

  

  return pool.query(queryString, [email]).then(res => {
    //console.log(res.rows)
    return res.rows[0]
    })


}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  // return Promise.resolve(users[id]);

  const queryString = `
    SELECT * FROM users
    where users.id = $1;
    `;

  return pool.query(queryString, [id]).then(res => res.rows[0])

}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);

  values = [user.name, user.email, user.password]

  const queryString = `
    insert into users (
      name, email, password) 
    values ($1, $2, $3)
    returning *`;

    // console.log(values)

   return pool.query(queryString, values)
  

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  // return getAllProperties(null, 2);

  queryString = `
    select properties.*, reservations.start_date, avg(property_reviews.rating) as average_rating
    from properties
    join reservations on reservations.property_id = properties.id
    join users on users.id = reservations.guest_id
    join property_reviews on property_reviews.property_id = properties.id
    where reservations.end_date < now()::date
    and users.id = $1
    group by properties.id, reservations.id
    order by reservations.start_date
    limit $2;
    `
    return pool.query(queryString, [guest_id, limit]).then(res => {
      console.log(res.rows)
      return res.rows});

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
// const getAllProperties = function(options, limit = 10) {
//   // const limitedProperties = {};
//   // for (let i = 1; i <= limit; i++) {
//   //   limitedProperties[i] = properties[i];
//   // }
//   // return Promise.resolve(limitedProperties);

//   const queryString = `
//     SELECT * FROM properties
//     LIMIT $1
//     `;

//   return pool.query(queryString, [limit]).then(res => res.rows)


// }


const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  let insert_init = false;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
    if (!insert_init) {
      insert_init = true;
    }
  }


  if (options.minimum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night)*100);
    if (insert_init) {
      console.log('AND HERE')
      queryString += `and cost_per_night >= $${queryParams.length}`
    } else {
      insert_init = true;
      console.log('WHERE HERE')
      queryString += `where cost_per_night >= $${queryParams.length}`
    }
  }

  if (options.maximum_price_per_night) {
    queryParams.push(Number(options.maximum_price_per_night)*100);
    if (insert_init) {
      console.log('AND HERE')
      queryString += `and cost_per_night <= $${queryParams.length}`
    } else {
      insert_init = true;
      console.log('WHERE HERE')
      queryString += `where cost_per_night <= $${queryParams.length}`
    }
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    if (insert_init) {
      console.log('AND HERE')
      queryString += `and rating >= $${queryParams.length}`
    } else {
      insert_init = true;
      console.log('WHERE HERE')
      queryString += `where rating >= $${queryParams.length}`
    }
  }

  // if (options.maximum_price_per_night) {
  //   queryParams.push();
  //   if (insert_init) {

  //   } else {
  //     insert_init = true;
  //   }
  // }

  // if (options.minimum_rating) {
  //   queryParams.push();
  //   if (insert_init) {

  //   } else {
  //     insert_init = true;
  //   }
  // }

  // owner_id,
  // minimum_price_per_night,
  // minimum_price_per_night,
  // minimum_rating


  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  // console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);

  // {
  //   owner_id: int,
  //   title: string,
  //   description: string,
  //   thumbnail_photo_url: string,
  //   cover_photo_url: string,
  //   cost_per_night: string,
  //   street: string,
  //   city: string,
  //   province: string,
  //   post_code: string,
  //   country: string,
  //   parking_spaces: int,
  //   number_of_bathrooms: int,
  //   number_of_bedrooms: int
  // }

  // let values = [];
  // for (key in property) {
  //   values.push(property[key]);
  // }

  values =[
    property.owner_id,
   property.title,
   property.description,
   property.thumbnail_photo_url,
   property.cover_photo_url,
   property.cost_per_night,
   property.street,
   property.city,
   property.provence,
   property.post_code,
   property.country,
   property.parking_spaces,
   property.number_of_bathrooms,
   property.number_of_bedrooms,
   true
  ];

  queryString = `
    insert into properties (owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      provence,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms,
      active)
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    returning *`;

  console.log(values)

  return pool.query(queryString, values)

}
exports.addProperty = addProperty;
