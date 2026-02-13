# INTEGRAL CALCULUS

---

## Integration Techniques

*   $\int u^n du = \frac{u^{n+1}}{n+1} + C \quad (n \neq -1)$
*   $\int \frac{1}{u} du = \ln |u| + C \quad (n = -1)$
*   **Integration by Parts:** $\int u dv = uv - \int v du$

---

## Exponential and Logarithmic

*   $\int e^u du = e^u + C$
*   $\int a^u du = \frac{a^u}{\ln a} + C$
*   $\int (\ln u) du = u(\ln u - 1) + C$
*   $\int (\log_a u) du = \frac{1}{\ln a} u(\ln u - 1) + C$

---

## Trigonometric Functions

*   $\int \sin u du = -\cos u + C$
*   $\int \cos u du = \sin u + C$
*   $\int \tan u du = \ln |\sec u| + C$
*   $\int \cot u du = \ln |\sin u| + C$
*   $\int \sec u du = \ln |\sec u + \tan u| + C$
*   $\int \csc u du = \ln |\csc u - \cot u| + C$
*   $\int \sec^2 u du = \tan u + C$
*   $\int \csc^2 u du = -\cot u + C$
*   $\int \tan u \sec u du = \sec u + C$
*   $\int \cot u \csc u du = -\csc u + C$

---

## Hyperbolic Functions

*   $\int \sinh u du = \cosh u + C$
*   $\int \cosh u du = \sinh u + C$
*   $\int \text{sech } u \tanh u du = -\text{sech } u + C$
*   $\int \text{csch } u \coth u du = -\text{csch } u + C$
*   $\int \text{sech}^2 u du = \tanh u + C$
*   $\int \text{csch}^2 u du = -\text{coth } u + C$
*   $\int \tanh u du = \ln |\cosh u| + C$
*   $\int \coth u du = \ln |\sinh u| + C$

---

## Area Integrals

*   **Vertical Strip:** $A = \int_{x_1}^{x_2} |y_2 - y_1| dx$
*   **Horizontal Strip:** $A = \int_{y_1}^{y_2} |x_2 - x_1| dy$
*   **Polar Area:** $A = \frac{1}{2} \int_{\theta_1}^{\theta_2} |r|^2 d\theta$

---

## Centroid Integrals

*   $\bar{x} = \frac{\int_{x_1}^{x_2} x |y_2 - y_1| dx}{\int_{x_1}^{x_2} |y_2 - y_1| dx}$
*   $\bar{y} = \frac{\frac{1}{2} \int_{x_1}^{x_2} |y_2 - y_1| \times |y_2 + y_1| dx}{\int_{x_1}^{x_2} |y_2 - y_1| dx}$
*   Horizontal formulations follow similar logic using $y$.

---

## ARCLENGTH
*   $L = \int_{x_1}^{x_2} \sqrt{1 + (y')^2} dx$
*   $L = \int_{y_1}^{y_2} \sqrt{1 + (x')^2} dy$

---

## Solids of Revolution

**Method of Disks and Washers:**
*   $V = \int_a^b \pi(x_2^2 - x_1^2) dy$
*   $V = \int_a^b \pi(y_2^2 - y_1^2) dx$

---

## WORK
*   $W = F \times s$
*   $W = \int_a^b F(s) ds$
*   $Work = \int_{x_1}^{x_2} F(x) dx$

---

## INTEGRATION OF COMPLEX NUMBERS: CAUCHY FORMULA (Advanced Math)
$$\frac{1}{2\pi i} \int_C \frac{f(z) dz}{z - a} = f(a)$$
$$a = |z|$$

### GENERAL FORM OF CAUCHY FORMULA
$$\frac{n!}{2\pi i} \int_C \frac{f(z) dz}{(z - a)^{n+1}} = f^{(n)}(a)$$
$$a = |z|$$
