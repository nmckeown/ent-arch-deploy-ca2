module.exports = {
  config_id: "development",
  app_name: "Recipe Tracker",
	webservice_host: process.env.BACKEND_HOST|| "localhost", 
	webservice_port: process.env.BACKEND_PORT || "8080", 
	exposedPort: process.env.FRONTEND_PORT || "22137"
};