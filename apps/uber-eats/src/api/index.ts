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
    const response = await axios.put(url, payload);
    return response.data;
  }
  static async fetchAddress() {
    const url = `/api/v1/auth-service/users/address`;
    const response = await axios.get(url);
    return response.data;
  }

  static async createAddress(payload: any) {
    const url = `/api/v1/auth-service/users/address`;
    const response = await axios.post(url, payload);
    return response.data;
  }

  static async createPayment({ cart }: any) {
    const response = await axios.post("/api/v1/payment-service/payments", cart);
    return response.data;
  }

  static async updatePayment({ cart }: any) {
    const response = await axios.put(
      "/api/v1/payment-service/payments/confirm-payment",
      cart
    );
    return response.data;
  }

  static async updatePaymentStatusSuccess({ cart }: any) {
    const response = await axios.put("/api/v1/payments", {
      status: "success",
      ...cart,
    });
    return response.data;
  }

  static async updatePaymentStatusFailed({ cart }: any) {
    const response = await axios.put("/api/v1/payments", {
      status: "failure",
      ...cart,
    });
    return response.data;
  }

  static async createOrder(data: any) {
    const response = await axios.post("/api/v1/order-service/order", data);
    return response.data;
  }
  static async fetchLatestOrder() {
    const response = await axios.get("/api/v1/order-service/order");
    return response.data;
  }
  static async confirmOrder(id: string) {
    const response = await axios.patch(
      `/api/v1/order-service/order/${id}?status=success`
    );
    return response.data;
  }
  static async confirmPayment(id: string) {
    const response = await axios.patch(
      `/api/v1/payment-service/payments/${id}?status=success`
    );
    return response.data;
  }
  static async cancelOrder(id: string) {
    const response = await axios.patch(
      `/api/v1/order-service/order/${id}?status=failure`
    );
    return response.data;
  }
  static async cancelPayment(id: string) {
    const response = await axios.patch(
      `/api/v1/payment-service/payments/${id}?status=failure`
    );
    return response.data;
  }
}
