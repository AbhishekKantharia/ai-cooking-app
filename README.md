# AI Cooking To-Do List & Meal Planner

A simple AI micro-app designed to help users generate a personalized cooking to-do list based on their daily schedule, budget, and dietary preferences.

## 🌟 Persona & Chosen Vertical
This application is built around the **Smart Home / Personal Assistant** persona, specifically focusing on **Dynamic Cooking Assistance and Meal Planning**. It addresses the common pain point of deciding what to cook, creating a shopping list, checking budget constraints, and finding substitutions based on individual daily schedules and dietary needs.

---

## 🛠️ How It Works
1. **User Input:**
   - **Daily Schedule:** Users describe their day (e.g., "very busy day, only 20 mins for lunch, relaxed evening").
   - **Daily Budget:** Users input a target budget (e.g., "$30").
   - **Dietary Restrictions:** Users specify preferences (e.g., "Vegan", "No Gluten", "High Protein").

2. **AI Processing:**
   - The application interacts with the **Google Gemini API** (using the `gemini-2.5-flash` model).
   - We utilize **Structured JSON Output** to ensure the model responds with a strictly defined JSON structure containing:
     - `meals`: An array of objects for Breakfast, Lunch, and Dinner (with prep time and description).
     - `groceryList`: A categorized list of ingredients with estimated costs.
     - `substitutions`: Swap recommendations for dietary constraints.
     - `budgetAnalysis`: An evaluation of total cost feasibility against the user's budget.

3. **Dynamic UI:**
   - Built with **React** (Vite) and styled with clean, responsive **Vanilla CSS** employing a modern glassmorphism aesthetic.
   - Organized into easy-to-navigate tabs: **Meal Plan**, **Grocery List**, **Substitutions**, and **Budget**.

---

## 🧠 Approach & Decision-Making Logic
- **Structured Schema:** To ensure the React UI never breaks due to unstructured LLM text outputs, we enforce a rigid JSON schema in the Gemini API call (`SchemaType.OBJECT`).
- **Flexible Workflows:** We support local development with a simulated fallback if the API key is not yet set, ensuring a smooth transition to live deployment.
- **Single Branch & Clean Deployments:** The project is deployed directly to GitHub Pages from the `master` branch using GitHub Actions, complying with strict single-branch rules.

---

## 📋 Assumptions Made
- **API Key Handling:** The API key is loaded via Vite's `import.meta.env.VITE_GEMINI_API_KEY`. For live GitHub Pages deployments, this must be added as a GitHub Actions Secret.
- **Estimated Prices:** Ingredient price estimates returned by the AI are mock approximations representing typical retail averages to help calculate the budget analysis.

---

## 🚀 Getting Started Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/AbhishekKantharia/ai-cooking-app.git
   cd ai-cooking-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variable:
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
