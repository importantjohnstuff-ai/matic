# VECTOR ANALYSIS

## Mode: VECTOR

### Dot Product — scalar product
*   $\mathbf{A} \cdot \mathbf{B} = a_x b_x + a_y b_y + a_z b_z$
*   $\mathbf{A} \cdot \mathbf{B} = |\mathbf{A}||\mathbf{B}| \cos \theta$

**Dot Product Rules:**
*   $i \cdot i = j \cdot j = k \cdot k = 1$
*   $i \cdot j = j \cdot k = k \cdot i = 0$
*   $\mathbf{A} \cdot \mathbf{B} = \mathbf{B} \cdot \mathbf{A}$
*   $\mathbf{A} \cdot (\mathbf{B} + \mathbf{C}) = \mathbf{A} \cdot \mathbf{B} + \mathbf{A} \cdot \mathbf{C}$
*   $m(\mathbf{A} \cdot \mathbf{B}) = (m\mathbf{A}) \cdot \mathbf{B}$

### Cross Product — vector product
$$\mathbf{A} \times \mathbf{B} = \begin{vmatrix} i & j & k \\ a_x & a_y & a_z \\ b_x & b_y & b_z \end{vmatrix}$$

**Magnitude:** $|\mathbf{A} \times \mathbf{B}| = |\mathbf{A}||\mathbf{B}| \sin \theta$

**Cross Product Rules:**
*   $i \times i = j \times j = k \times k = 0$
*   $i \times j = k, j \times k = i, k \times i = j$
*   $\mathbf{A} \times \mathbf{B} = -(\mathbf{B} \times \mathbf{A})$
*   $\mathbf{A} \times (\mathbf{B} + \mathbf{C}) = \mathbf{A} \times \mathbf{B} + \mathbf{A} \times \mathbf{C}$
*   $m(\mathbf{A} \times \mathbf{B}) = (m\mathbf{A}) \times \mathbf{B}$

---

## EQUATION OF A LINE AND PLANE in 3D
### LINE in 3D
$$(x - x_0)i + (y - y_0)j + (z - z_0)k = (ai + bj + ck)t$$
$$\mathbf{r} = \mathbf{r}_0 + t\mathbf{v}$$
*   $x = x_0 + at$
*   $y = y_0 + bt$
*   $z = z_0 + ct$
$$\frac{x - x_0}{a} = \frac{y - y_0}{b} = \frac{z - z_0}{c}$$

### PLANE in 3D
$$[(x - x_0)i + (y - y_0)j + (z - z_0)k] \cdot (ai + bj + ck) = 0$$
$$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$$

---

## Vector Del Operator
Also known as **nabla**, used as a partial differential operator for vector quantities.
$$\nabla = \frac{\partial}{\partial x}i + \frac{\partial}{\partial y}j + \frac{\partial}{\partial z}k$$

*   **Gradient (scalar):** $\nabla \phi = \frac{\partial \phi}{\partial x}i + \frac{\partial \phi}{\partial y}j + \frac{\partial \phi}{\partial z}k$ (Result is a vector!)
*   **Divergence (vector):** $\nabla \cdot \mathbf{V} = \frac{\partial V_x}{\partial x} + \frac{\partial V_y}{\partial y} + \frac{\partial V_z}{\partial z}$ (Result is a scalar!)
*   **Curl:** $\nabla \times \mathbf{V} = \begin{vmatrix} i & j & k \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ V_x & V_y & V_z \end{vmatrix}$ (Vorticity per unit area of flux)

### Other important formulas involving $\nabla$
*   $\nabla(\phi + \psi) = \nabla \phi + \nabla \psi$
*   $\nabla \cdot (\mathbf{A} + \mathbf{B}) = \nabla \cdot \mathbf{A} + \nabla \cdot \mathbf{B}$
*   $\nabla \times (\mathbf{A} + \mathbf{B}) = \nabla \times \mathbf{A} + \nabla \times \mathbf{B}$
*   $\nabla \cdot (\phi \mathbf{A}) = (\nabla \phi) \cdot \mathbf{A} + \phi(\nabla \cdot \mathbf{A})$
*   $\nabla \times (\phi \mathbf{A}) = (\nabla \phi) \times \mathbf{A} + \phi(\nabla \times \mathbf{A})$
*   $\nabla \cdot (\nabla \phi) = \nabla^2 \phi = \frac{\partial^2 \phi}{\partial x^2} + \frac{\partial^2 \phi}{\partial y^2} + \frac{\partial^2 \phi}{\partial z^2}$
*   $\nabla^2 = \frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + \frac{\partial^2}{\partial z^2} \rightarrow$ **Laplacian Operator**
