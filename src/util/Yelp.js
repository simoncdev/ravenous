const clientId = 'LJqXtIopDYQ8NHrQo1vZeQ'
const secret = '4O6TbVdBlLpWMUS0obxQZ9nwh7eYFbww3a04hrl4duLrVyMboWXU3RLLkob9eqdw';
let accessToken;

const Yelp = {
  getAccessToken(){
    if (accessToken){
      return new Promise(
        resolve =>
          resolve(accessToken));

        /*Apparently above you don't need the curly brackets - Step 13*/
    }
    /*Not sure about the below interpolation - Step 15*/
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,
      {
        method: 'POST'
      }).then(response => {
        return response.json();
      }).then(
      jsonResponse => {
        //Changed to this. below because it failed to compile
        accessToken = jsonResponse.access_token;
      }
    );
  },

  search (term, location, sortBy){
    return Yelp.getAccessToken().then(
      /*Not sure about this callback gunction with no parameters - Answer: Just use empty ()*/
      () => {
        return fetch(
          `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
       }).then(
          response => {return response.json();}
        ).then(
          jsonResponse => {
            if (jsonResponse.businesses){
              return jsonResponse.businesses.map(
                /*Not sure whether I should have normal or curly brackets below - step 30*/
                business => ({
                  // return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count
                  // }
                }));
            }
          });
      }
    };

export default Yelp;
