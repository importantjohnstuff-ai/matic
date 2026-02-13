# TRANSFORMERS

## SINGLE PHASE TRANSFORMERS

### General Information
*   A transformer is a static device which can transfer electrical energy from one circuit to another circuit without change of frequency.
*   It works on the principle of **mutual induction**.

### Core Construction
*   **Air-core transformers**: Used for voltage sources with high frequency (> 20 kHz).
*   **Iron-core transformers**: Used for voltage sources with low frequency (< 20 kHz).
*   **Material**: High Grade Silicon steel – used to ensure low hysteresis loss.

### Windings
*   **Primary winding**: Where electrical energy is fed.
*   **Secondary winding**: Connected to the load.
*   **Mutual Flux**: The part of the flux that goes from the primary winding (pw) to the secondary winding (sw).
*   **Leakage Flux**: The part of the flux that does not proceed to the secondary winding.
*   **Interleaving**: In actual transformer construction, the primary and secondary windings are interleaved to **reduce the leakage flux**.

### Working Principle
*   **Faraday's Law of Electromagnetic Induction**:
    *   $e_1 = -N_1 \frac{d\phi}{dt}$
    *   $e_2 = -N_2 \frac{d\phi}{dt}$
*   **EMF Equation**: $\frac{E_1}{N_1} = \frac{E_2}{N_2} = 4.44 f \phi_m$
*   **Transformation Ratio (K)**:
    *   $K = \frac{V_2}{V_1} = \frac{E_2}{E_1} = \frac{N_2}{N_1}$
    *   $K > 1 \rightarrow$ step-up transformer
    *   $K < 1 \rightarrow$ step-down transformer

### Transformer Rating
*   **kVA or MVA rating**:
    *   $kVA = \frac{I_1 V_1}{1000} = \frac{I_2 V_2}{1000}$
    *   $MVA = \frac{I_1 V_1}{10^6} = \frac{I_2 V_2}{10^6}$
*   **kVA and Per Unit Rating**:
    *   $\%Z = \frac{kVA \times Z}{10(kV)^2}$
    *   $p.u. \text{ rating} = \frac{\%Z}{100}$
*   **Change in kVA**:
    *   $\frac{kVA_A}{kVA_B} = \frac{Z_{A,pu}}{Z_{B,pu}} \times \left( \frac{V_A}{V_B} \right)^2$

---

### Losses in a Transformer
There are two main types of losses:
1.  **Iron or Core Loss ($P_i$)**: Due to the reversal of flux in the core.
    *   **Hysteresis Loss**: Occurs due to the setting of an alternating flux in the core.
    *   **Eddy Current Loss**: Due to the flow of eddy currents in the core caused by induced emf.
2.  **Copper Loss ($P_{Cu}$)**: Due to the resistances of the primary (pw) and secondary (sw) windings.
    *   $P_{Cu} = I_1^2 R_1 + I_2^2 R_2$
    *   $P_{\text{no load}} = P_i + P_{Cu}$

### Transformer on No Load
*   **Magnetic Component**: $I_\mu = I_0 \sin \phi_0$
*   **Iron/Power Loss Component**: $I_i = I_0 \cos \phi_0$
*   **No-Load Current**: $I_0 = \sqrt{I_\mu^2 + I_i^2}$
*   **Iron Loss**: $P_i = V_1 I_0 \cos \phi_0$

### Practical Transformers & Equivalent Circuits
*   $R_1, R_2$: Primary and secondary winding resistances.
*   $X_1, X_2$: Primary and secondary reactances due to flux leakage.
*   **Modified Circuit in terms of Primary Winding (PW)**:
    *   $R_{01} = R_1 + \frac{R_2}{K^2}$
    *   $X_{01} = X_1 + \frac{X_2}{K^2}$
    *   $Z = R_{01} + jX_{01}$
*   **Modified Circuit in terms of Secondary Winding (SW)**:
    *   $R_{02} = R_1 K^2 + R_2$
    *   $X_{02} = X_1 K^2 + X_2$
    *   $Z = R_{02} + jX_{02}$
*   **Transformation Ratio**: $K = V_2 / V_1$

---

### Voltage Regulation
Voltage regulation is the change in the secondary terminal voltage from no load to full load, hence $E_2 > V_2$.

*   **Secondary**: $VR = \frac{E_2 - V_2}{E_2} \times 100$
*   **Primary**: $VR = \frac{V_1 - E_1}{V_1} \times 100$
*   **In per unit basis**: $VR = (\%R) \cos \phi \pm (\%X) \sin \phi$
*   **Detailed Formulas**:
    *   Secondary: $VR = \frac{I_2 (R_{02} \times pf \pm X_{02} \sin(\cos^{-1}(pf)))}{E_2}$
    *   Primary: $VR = \frac{I_1 (R_{01} \times pf \pm X_{01} \sin(\cos^{-1}(pf)))}{V_1}$
    *   *Note: (-) for leading, (+) for lagging power factor.*

---

### Efficiency of a Transformer
*   $\eta = \frac{\text{Output}}{\text{Input}}$
*   $\eta = \frac{\text{Output}}{\text{Output} + (\text{Cu Loss} + \text{Fe loss})}$
*   $\eta = \frac{\text{Input} - (\text{Cu Loss} + \text{Fe loss})}{\text{Input}}$
*   **General Formula**: $\eta = \frac{x \times \text{Full Load kVA} \times pf}{x \times \text{Full Load kVA} \times pf + P_i + x^2 P_{Cu}}$
    *   Where $x = \frac{\text{output load kVA}}{\text{Full load kVA}}$
*   **Maximum Efficiency Condition**: $x^2 P_{Cu} = P_i$
    *   $\text{Output kVA at Max Efficiency} = \text{Full load kVA} \times \sqrt{\frac{P_i}{P_{Cu}}}$

---

### Transformer Circuit Tests
The purpose of testing is to determine:
*   Iron loss or core loss
*   Magnetising resistance $R_0$
*   Magnetising reactance $X_0$

#### Open Circuit (OC) Test
Performed at **NO LOAD** state.
*   **Iron component**: $I_i = \frac{W_o}{V_1}$
*   **No Load p.f.**: $\cos \phi_0 = \frac{W_o}{V_1 I_0}$
*   **Magnetizing**: $I_\mu = \sqrt{I_0^2 - I_i^2}$
*   **Exciting Resistance**: $R_0 = \frac{V_1}{I_i}$
*   **Exciting Reactance**: $X_0 = \frac{V_1}{I_\mu}$

#### Short Circuit (SC) Test
Test is from **no load to full load**. The purpose is to determine full load $W_{Cu}$, equivalent resistances, and reactances.
*   **Primary Side**:
    *   $Z_{01} = \frac{V_{sc}}{I_{sc}}$
    *   $R_{01} = \frac{W_{sc}}{I_{sc}^2}$
    *   $X_{01} = \sqrt{Z_{01}^2 - R_{01}^2}$
*   **Secondary Side**:
    *   $Z_{02} = \frac{V_{sc}}{I_{sc}}$
    *   $R_{02} = \frac{W_{sc}}{I_{sc}^2}$
    *   $X_{02} = \sqrt{Z_{02}^2 - R_{02}^2}$

---

### All-Day Efficiency
All-day efficiency is the ratio of the total energy output to the total energy input over a 24-hour period, accounting for both varying loads and constant losses.

$$\text{All-Day Efficiency} = \frac{\text{Output in kWh in 24 hr}}{\text{Output in kWh in 24 hr} + P_i \text{ in kWh in 24 hr} + P_{Cu} \text{ in kWh in 24 hr}}$$

---

## THREE PHASE TRANSFORMERS

### Construction
*   **3Φ-core-type**
*   **3Φ-shell-type**

### Three Phase Transformer Connections
| Primary Configuration | Secondary Configuration |
| :--- | :--- |
| Delta (Mesh) | Delta (Mesh) |
| Delta (Mesh) | Star (Wye) |
| Star (Wye) | Delta (Mesh) |
| Star (Wye) | Star (Wye) |
| Interconnected Star | Delta (Mesh) |
| Interconnected Star | Star (Wye) |

### 3Φ-Transformer Connection Relations
| Connection | Phase Voltage | Line Voltage | Phase Current | Line Current |
| :--- | :--- | :--- | :--- | :--- |
| **Star** | $V_p = V_L \div \sqrt{3}$ | $V_L = \sqrt{3} \times V_p$ | $I_p = I_L$ | $I_L = I_p$ |
| **Delta** | $V_p = V_L$ | $V_L = V_p$ | $I_p = I_L \div \sqrt{3}$ | $I_L = \sqrt{3} \times I_p$ |

*   **Transformation Ratio**: $K = \frac{V_{p2}}{V_{p1}}$

### Parallel Transformers - Load Sharing
*   $S_A = S \frac{Z_B}{Z_A + Z_B}$
*   $S_B = S \frac{Z_A}{Z_A + Z_B}$
