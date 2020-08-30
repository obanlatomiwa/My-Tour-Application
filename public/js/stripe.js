/*eslint-disable*/

import axios from 'axios';
const stripe = Stripe(
 'pk_test_51HG7bGAdnEx1FnE7QGmJ3kr4Eu0GUaAvxeaPT63lEzrl8PBX2PmSNILphJfIhUboYa2Pk0v5r0zlQ8JsYdHsfaug00WAOBRYPf'
);

export const bookTour = async (tourId) => {
  // get checkout session from API
  const session = await axios(
   `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
  );
  console.log(session);
  // creatte checkout form and charge client card
};

