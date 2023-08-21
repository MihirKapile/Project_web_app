import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = axios.create({
  withCredentials: true,
});

const YELP_API_BASE = 'http://localhost:4000/proxy/yelp';
const REACT_APP_SERVER_API_URL="http://localhost:4000"
const USERS_API = `${process.env.REACT_APP_SERVER_API_URL}/users`;

const YELP_RESTAURANT_API = `${YELP_API_BASE}/restaurants`;
const RESTAURANT_API = "http://localhost:4000/api/restaurants";

export const userLikesRestaurant = async (restaurantId, restaurant) => {
  const response = await api.post(`${RESTAURANT_API}/${restaurantId}/likes`, restaurant);
  console.log("response", response);
  return response.data;
};

export const getLikesForUser = async (userId) => {
  const response = await api.get(
    `http://localhost:4000/api/users/${userId}/likes`
  );
  return response.data;
};

export const getLikesForRestaurant = async (restaurantId) => {
  const response = await api.get(
    `http://localhost:4000/api/restaurants/${restaurantId}/likes`
  );
  return response.data;
};

export const fullSearch = async (query) => {
  const params = {
      location: query,
      sort_by: 'best_match',
    };
  const response = await axios.get(YELP_API_BASE, { params });
  return response.data;
}

export const getRestaurant = async (id) => {
  const response = await axios.get(
    `${YELP_API_BASE}/${id}`
  );
  const restaurants = response.data;
  return restaurants;
};

export const userReviewsRestaurant = async (restaurantId, restaurant) => {

  const response = await api.post(`${RESTAURANT_API}/${restaurantId}/reviews`, restaurant);
  console.log("response", response);
  return response.data;
};

export const getReviewsForUser = async (userId) => {
  const response = await api.get(
    `http://localhost:4000/api/users/${userId}/reviews`
  );
  return response.data;
};

export const getReviewsForRestaurant = async (restaurantId) => {
  const response = await api.get(
    `http://localhost:4000/api/restaurants/${restaurantId}/reviews`
  );
  return response.data;
};