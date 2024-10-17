const express = require("express");
const router = express.Router();
const { authenticateToken } = require("./authMiddleware");
const authorizeRole = require("./roleMiddleware");
const axios = require("axios");

const graphApiBaseUrl = "https://graph.microsoft.com/v1.0";

const graphApiCall = async (url, method, token, data = null) => {
  const config = {
    method: method,
    url: `${graphApiBaseUrl}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };
  return axios(config);
};

router.post(
  "/",
  authenticateToken,
  // authorizeRole(["admin", "super_admin", "lab_technician"]),
  async (req, res) => {
    try {
      console.log("the request got here")
      const result = await graphApiCall(
        "/users",
        "POST",
        req.headers.authorization.split(" ")[1],
        req.body
      );
      console.log("result or got stuck?", result)
      res.json(result.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.patch(
  "/:id",
  authenticateToken,
  authorizeRole(["admin", "super_admin"]),
  async (req, res) => {
    try {
      const result = await graphApiCall(
        `/users/${req.params.id}`,
        "PATCH",
        req.headers.authorization.split(" ")[1],
        req.body
      );
      res.json(result.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["admin", "super_admin", "lab_technician"]),
  async (req, res) => {
    try {
      const result = await graphApiCall(
        `/users/${req.params.id}`,
        "DELETE",
        req.headers.authorization.split(" ")[1]
      );
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/",
  authenticateToken,
  authorizeRole([
    "admin",
    "super_admin",
    "doctor",
    "pharmacist",
    "health_assistant, lab_technician",
  ]),
  async (req, res) => {
    try {
      const result = await graphApiCall(
        "/users",
        "GET",
        req.headers.authorization.split(" ")[1]
      );
      res.json(result.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
