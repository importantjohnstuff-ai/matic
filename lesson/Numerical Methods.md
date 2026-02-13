# NUMERICAL METHODS

## 1. Gauss Elimination Method
The unknowns are eliminated successively and the system is reduced to an **upper triangular system (echelon)**.

## 2. Jacobi Method
Iterative method which involves not using improved values until a step has been completed and then replacing $x^{(r)}$ by $x^{(r+1)}$ at once, directly before the beginning of the next step.

## 3. Gauss–Seidel Method
A modification of the Jacobi iteration method. It is a method of successive corrections because for each component we successively replace an approximation of a component by a corresponding new approximation as soon as the latter has been computed.

---

## Solving Transcendental Equations

### 1. Bisection Method
Convergence is guaranteed but **slow**.
$$x_2 = (x_1 + x_0) / 2$$

### 2. Regula–Falsi Method
Method of false position. It guarantees convergence at a **faster rate**.
$$x_2 = \frac{x_1 f(x_0) - x_0 f(x_1)}{f(x_0) - f(x_1)}$$

### 3. Newton–Raphson Method
Method of false position. It guarantees convergence at a **faster rate**. Only requires single point as initial iteration.
$$x_1 = x_0 - \frac{f(x_0)}{f'(x_0)}$$

### 4. Secant Method
Finite difference approximation of Newton—Raphson method.

---

### Method Comparison Table
| Method | Convergence | Bracketing | Rate |
| :--- | :--- | :--- | :--- |
| **BISECTION** | always converge | YES-by averaging | SLOW |
| **NEWTON-RAPHSON** | may diverge | NO | FAST |
| **REGULA FALSI** | always converge | YES-by quotient | SLOW |
| **SECANT** | may diverge | NO | FAST |

---

## Numerical Integration

### 1. Rectangular Rule
Approximation by summing the areas of rectangles.
$$J = \int_a^b f(x) dx \approx h[f(x_1^*) + f(x_2^*) + \dots + f(x_n^*)]$$
$$h = \frac{b - a}{n}$$

### 2. Trapezoidal Rule
Approximation by summing the areas of trapezoids.
$$\int_a^b f(x) dx = \frac{h}{2} [f(a) + f(x_1) + f(x_2) + \dots + f(x_{n-1}) + f(b)]$$

### 3. Simpson’s 1/3-Rule
Approximation by summing the areas of parabolas.
$$A = \frac{h}{3} (f(a) + 4f(x_1) + 2f(x_2) + \dots + f(b))$$
$$h = \frac{b - a}{n}$$
