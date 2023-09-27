import axios from "axios";

export class ExternalApis {
  // proxy gateway url
  public static url = "http://localhost:3000/api/v1";
  static sleep() {
    return new Promise((a, b) => {
      setTimeout(() => {
        a(null);
      }, 2000);
    });
  }
  static async fetchCart() {
    const url = `${this.url}/cart-service/cart`;
    // cookies have token
    const response = await axios.get(url);
    return response.data;
  }
  static async addCartItems(payload: any) {
    const url = `${this.url}/cart-service/cart`;
    const response = await axios.post(url, payload);
    return response.data;
  }
  static async removeCartItems(payload: any) {
    const url = `${this.url}/cart-service/cart`;
    const response = await axios.delete(url, payload);
    return response.data;
  }
  static async fetchAddress(config: any) {
    const url = `/api/v1/users/addresses`;
    const response = await axios.get(url, config);
    return response.data;
  }

  static async createAddress(payload: any, config: any) {
    const url = `/api/v1/users/addresses`;
    const response = await axios.post(url, payload, config);
    return response.data;
  }

  static async createPayment({ cart }: any, config: any) {
    const response = await axios.post("/api/v1/payments", cart, config);
    return response.data;
  }

  static async updatePayment({ cart }: any, config: any) {
    const response = await axios.put("/api/v1/payments", cart, config);
    return response.data;
  }

  static async updatePaymentStatusSuccess({ cart }: any, config: any) {
    const response = await axios.put(
      "/api/v1/payments",
      { status: "success", ...cart },
      config
    );
    return response.data;
  }

  static async updatePaymentStatusFailed({ cart }: any, config: any) {
    const response = await axios.put(
      "/api/v1/payments",
      { status: "failure", ...cart },
      config
    );
    return response.data;
  }

  static async createOrder({ cart }: any, config: any) {
    const response = await axios.post("/api/v1/orders", cart, config);
    return response.data;
  }
}
