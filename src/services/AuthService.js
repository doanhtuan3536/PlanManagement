// src/services/authService.js
import axiosInstance from '../utils/AxiosConfig';

class AuthService {
  constructor() {
    this.tokens = {
      opaqueToken: null,
      refreshToken: null,
      expiresIn: null
    };
    this.refreshPromise = null;
  }

  async login(username, password) {
    try {
      const response = await axiosInstance.post('/api/auth/login', {
        username,
        password
      });

      if (response.status === 200) {
        const data = response.data;
        
        // Store tokens in memory
        this.tokens = {
          opaqueToken: data.opaqueToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn
        };

        console.log(this.tokens)

        // Store user info in memory or context
        // this.user = {
        //   username: username,
        //   // You can extract more info from response if needed
        // };

        // // Calculate token expiry time
        // this.tokenExpiryTime = Date.now() + (data.expiresIn * 1000);

        // // Schedule token refresh
        // this.scheduleTokenRefresh();

        console.log('Login successful, tokens stored in memory');
        return {
          success: true,
          data: data
        };
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  }

  async refreshToken() {
    // Prevent multiple refresh requests
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await axiosInstance.post('/api/auth/refresh', {
          refreshToken: this.tokens.refreshToken
        });

        if (response.status === 200) {
          const data = response.data;
          
          // Update tokens in memory
          this.tokens = {
            opaqueToken: data.opaqueToken,
            refreshToken: data.refreshToken || this.tokens.refreshToken,
            expiresIn: data.expiresIn
          };

          this.tokenExpiryTime = Date.now() + (data.expiresIn * 1000);
          
          // Reschedule refresh
          this.scheduleTokenRefresh();

          console.log('Token refreshed successfully');
          resolve(true);
        } else {
          reject(new Error('Refresh failed'));
        }
      } catch (error) {
        console.error('Refresh failed:', error);
        this.clearTokens();
        reject(error);
      } finally {
        this.refreshPromise = null;
      }
    });

    return this.refreshPromise;
  }

  scheduleTokenRefresh() {
    // Clear existing timer
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    if (!this.tokenExpiryTime) return;

    // Calculate time to refresh (1 minute before expiry)
    const timeUntilExpiry = this.tokenExpiryTime - Date.now();
    const refreshTime = Math.max(0, timeUntilExpiry - 60000); // 1 minute before

    if (refreshTime <= 0) {
      // Already expired or about to expire, refresh now
      this.refreshToken();
    } else {
      // Schedule refresh
      this.refreshTimer = setTimeout(() => {
        this.refreshToken();
      }, refreshTime);
    }
  }

  async logout() {
    try {
      await axiosInstance.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
      window.location.href = '/login';
    }
  }

  clearTokens() {
    this.tokens = {
      opaqueToken: null,
      refreshToken: null,
      expiresIn: null
    };
    this.user = null;
    this.tokenExpiryTime = null;
    
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
  }

  isAuthenticated() {
    return !!this.tokens.opaqueToken && Date.now() < this.tokenExpiryTime;
  }

  getAuthStatus() {
    return {
      isAuthenticated: this.isAuthenticated(),
      user: this.user,
      expiresIn: this.tokenExpiryTime ? Math.floor((this.tokenExpiryTime - Date.now()) / 1000) : 0
    };
  }
}

// Create singleton instance
const authService = new AuthService();
export default authService;