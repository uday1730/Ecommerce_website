
# **E-commerce Website**

This project features a **multi-page e-commerce website**, developed using **JavaScript, HTML, and CSS**, with backend-simulated data handling and dynamic UI updates.

## **Project Overview**  
Designed with a focus on **interactivity and seamless user experience**, this website mimics a full-fledged shopping platform. The site includes **Home, Cart, and Order pages**, each interacting dynamically through **JavaScript logic and local storage** to simulate a real online shopping workflow.

### Key Features

* **Dynamic Product Listings**: The website loads product information from a predefined backend, making it easy to add or update items without changing the website's code.  
* **Interactive Cart System**: Users can add, remove, and modify items in their cart. The cart dynamically updates the total price, item count, and delivery details in real time.  
* **Persistent Storage**: The cart and order data are saved using the browser's local storage. This ensures that the user's information isn't lost if they reload the page or close the browser.  
* **Order Management**: After a user checks out, their order is generated and stored, simulating a purchase history for future reference.  
* **User-Oriented Design**: The website is built with a focus on providing a seamless and interactive user experience, mimicking a professional e-commerce platform.  

### How It Works

The e-commerce website operates as a single-page application (SPA) simulation across multiple HTML files.

1.  **Product Display**: The `index.html` (homepage) uses JavaScript to fetch product data from a simulated backend and dynamically render the listings on the page.
2.  **Adding to Cart**: When a user clicks "Add to Cart," a JavaScript function captures the product details and saves them to local storage.
3.  **Cart Interaction**: The `checkout.html` page's JavaScript reads the stored data, calculates totals, and displays the items. Any changes made by the user are instantly reflected on the page and in local storage.
4.  **Order Placement**: On the checkout page, a final JavaScript function processes the order, clearing the cart and moving the data into a new local storage entry for order history.
5.  **Order History**: The `orders.html` page retrieves and displays a user's past orders from local storage.

### Getting Started

This guide will help you set up and run the e-commerce website on your local machine.

#### Prerequisites

  * A modern web browser (like Chrome, Firefox, or Edge).
  * No specific backend software or server is required as the project is purely front-end and uses local storage for data persistence.

#### Running the System

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/uday1730/Ecommerce_website.git
    ```
2.  **Navigate to the Project Directory**:
    ```bash
    cd Ecommerce_website
    ```
3.  **Open the Website**: Simply open the `index.html` file in your web browser. You can do this by double-clicking the file or by dragging it into a browser window.

### 📂 Project Structure

  * `backend/`: A directory that contains files to simulate the backend.
  * `data/`: Stores the product data for the website.
  * `images/`: Contains all image assets, including product images.
  * `scripts/`: All JavaScript files for dynamic functionality are stored here.
  * `styles/`: All CSS files for styling the website are located here.
  * `tests/`: Includes test files to ensure the website functions correctly.
  * `utils/`: Houses reusable utility functions.
  * `checkout.html`: The HTML file for the checkout page.
  * `index.html`: The homepage HTML file.
  * `orders.html`: The HTML file for the user's order history page.
  * `tracking.html`: The HTML file for tracking orders.
  * `README.md`: The main README file for the repository.

### Future Enhancements

  * **User Authentication**: Implement a secure user login and registration system to personalize the shopping experience.
  * **Payment Gateway Integration**: Add a payments page to process transactions securely.
  * **User Order History**: Create a dedicated page for users to view their complete order history.
  * **Advanced Features**: Introduce features like a product search bar, filtering options, and user reviews to enhance functionality.

Heres the link: https://uday1730.github.io/Ecommerce_website/
