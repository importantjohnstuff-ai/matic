# DC CIRCUITS

## RESISTANCES, DC NETWORK & CAPACITORS

### Charge and Current
*   **Charge, Q:** Measured in Coulombs (C).
*   **Elementary Charge:** $1 e^- = 1.60 \times 10^{-19} C = e$
*   **Current, I:** Measured in Amperes (A).
    *   $I = \frac{Q}{t} \equiv \frac{C}{s} \equiv A$ (Ampere)

### Metric Prefixes
| Prefix | Name | Meaning |
| :--- | :--- | :--- |
| M | mega | multiply by 1,000,000 (i.e. $\times 10^6$) |
| k | kilo | multiply by 1,000 (i.e. $\times 10^3$) |
| m | milli | divide by 1,000 (i.e. $\times 10^{-3}$) |
| $\mu$ | micro | divide by 1,000,000 (i.e. $\times 10^{-6}$) |
| n | nano | divide by 1,000,000,000 (i.e. $\times 10^{-9}$) |
| p | pico | divide by 1,000,000,000,000 (i.e. $\times 10^{-12}$) |

### Electrical Potential and e.m.f.
*   **Electromotive Force (E or V):** Measured in Volts (V).
    *   $V = \frac{W}{Q} = \frac{P}{I}$
    *   $V, Volt$ = the power of 1 watt carried by a current of 1 ampere or the energy in J required to move 1 C-charge.
*   **Power (P):** $P = IV$

### Resistance and Conductance
*   **Electric Resistance, R:** Measured in Ohms ($\Omega$).
*   **Ohm's Law:** $R = \frac{V}{I}$
*   **Power Formulas:**
    *   $P = I^2 R$
    *   $P = V^2 / R$
*   **Conductance, G:** Measured in Siemens (S).
    *   $G = \frac{1}{R}$

### Resistance and Resistivity
*   **Resistance Formula:** $R = \rho \frac{\ell}{A}$
    *   $\rho$ = resistivity
*   **Resistance vs Temperature:**
    *   $R = R_0(1 + \alpha_0 T_C)$
    *   $R = R_{20}(1 + \alpha_{20}(T_C - 20))$

### Resistor Coding
**Letter-Digit Coding Examples:**
*   R33M = $0.33 \Omega \pm 20\%$
*   4R7K = $4.7 \Omega \pm 10\%$
*   390RJ = $390 \Omega \pm 5\%$

### Series and Parallel Networks
**Series**
*   $V = V_1 + V_2 + V_3$
*   $I = I_1 = I_2 = I_3$
*   $R = R_1 + R_2 + R_3$
*   **Voltage Divider:** $V_1 = V \left( \frac{R_1}{R_1 + R_2} \right)$

**Parallel**
*   $V = V_1 = V_2 = V_3$
*   $I = I_1 + I_2 + I_3$
*   $R = (R_1^{-1} + R_2^{-1} + R_3^{-1})^{-1}$
*   **Current Divider:** $I_1 = I \left( \frac{R_2}{R_1 + R_2} \right)$

### Network Transformations
**Delta-to-Star**
*   $R_A = \frac{R_{AC} \times R_{AB}}{R_{AC} + R_{AB} + R_{BC}}$
*   $R_B = \frac{R_{BC} \times R_{AB}}{R_{AC} + R_{AB} + R_{BC}}$
*   $R_C = \frac{R_{BC} \times R_{AC}}{R_{AC} + R_{AB} + R_{BC}}$

**Star-to-Delta**
*   $R_{AB} = R_A + R_B + \frac{R_A R_B}{R_C}$
*   $R_{BC} = R_B + R_C + \frac{R_B R_C}{R_A}$
*   $R_{AC} = R_A + R_C + \frac{R_A R_C}{R_B}$

### Complex Network Analysis
*   **Thevenin’s Theorem:** $I_L = \frac{V_{Th}}{R_{Th} + R_L}$
*   **Norton’s Theorem:** $I_L = \frac{I_N R_N}{R_N + R_L}$
*   **Millman’s Theorem:**
    *   $R_{Th} = \frac{1}{\sum 1/R}$
    *   $V_{Th} = \frac{\sum V/R}{\sum 1/R}$

---

## TRANSIENT DC CIRCUITS

| Circuit | Current | Voltage Drop |
| :--- | :--- | :--- |
| **RL** | $I = \frac{E}{R} \left( 1 - e^{-\frac{R}{L}t} \right)$ | $E_R = E \left( 1 - e^{-Rt/L} \right)$ <br> $E_L = E e^{-Rt/L}$ |
| **RC** | $I = \frac{E \pm \frac{Q_0}{C}}{R} e^{-t/RC}$ <br> (+): discharging <br> (-): charging | $E_R = E e^{-t/RC}$ <br> $E_C = E \left( 1 - e^{-t/RC} \right)$ |

*   **Time constant of RL Circuits:** $\tau = \frac{L}{R}$
*   **Time constant of RC Circuits:** $\tau = RC$

### TRANSIENT DC CIRCUITS - RLC

**Characteristic Equation:** $D^2 + \frac{R}{L}D + \frac{1}{LC} = 0$

| CASES | Discriminant | Current |
| :--- | :--- | :--- |
| **Overdamped** | $\left( \frac{R}{L} \right)^2 - \frac{4}{LC} > 0$ | $I = Ae^{D_1t} + Be^{D_2t}$ |
| **Critically Damped** | $\left( \frac{R}{L} \right)^2 - \frac{4}{LC} = 0$ | $I = (A + Bt)e^{-Rt/2L}$ |
| **Underdamped** | $\left( \frac{R}{L} \right)^2 - \frac{4}{LC} < 0$ | $I = e^{\alpha t} (A \cos \beta t + B \sin \beta t)$ |

**Parameters:**
*   $\alpha = -\frac{R}{2L}$
*   $\beta = \frac{\sqrt{\left( \frac{R}{L} \right)^2 - \frac{4}{LC}}}{2}$
