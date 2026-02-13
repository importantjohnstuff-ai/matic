# POWER FACTOR CORRECTION

**(Derived from AC Circuits and Machinery Principles)**

## Active, Reactive, and Apparent Power

In AC circuits, power is divided into three components:

*   **Active Power (P):** Measured in Watts (W). The real power consumed by the load.
    *   $P = VI \cos \phi$
*   **Reactive Power (Q):** Measured in Volt-Amperes Reactive (VAR). The power that oscillates between source and load, used to establish magnetic/electric fields.
    *   $Q = VI \sin \phi$
*   **Apparent Power (S):** Measured in Volt-Amperes (VA). The product of voltage and current.
    *   $S = VI$
    *   $S = \sqrt{P^2 + Q^2}$

## Power Factor

*   **Definition:** The cosine of the phase angle ($\phi$) between voltage and current.
*   **Formula:** $pf = \cos \phi = \frac{P}{S} = \frac{\text{Resistance}}{\text{Impedance}}$
*   **Range:** $0 \le pf \le 1$
    *   **Lagging:** Current lags voltage (Inductive load)
    *   **Leading:** Current leads voltage (Capacitive load)
    *   **Unity:** Current and voltage are in phase (Resistive load)

## Power Factor Correction (PFC)

Power factor correction is the technique of increasing the power factor of a power supply. Correction is typically achieved by adding a capacitor in parallel with the inductive load.

*   **Goal:** To reduce the phase angle $\phi$ between the voltage and current, bringing the power factor closer to 1 (unity).
*   ** Benefits:**
    1.  Reduced electricity bills (removal of reactive power penalties).
    2.  Increased system capacity.
    3.  Reduced voltage drop.
    4.  Reduced transmission losses.

### Calculation of Capacitor Bank Rating

To improve power factor from $\cos \phi_1$ (old) to $\cos \phi_2$ (new):

1.  **Old Reactive Power ($Q_1$):** $Q_1 = P \tan \phi_1$
2.  **New Reactive Power ($Q_2$):** $Q_2 = P \tan \phi_2$
3.  **Required Capacitor kVAR ($Q_C$):**
    $$Q_C = Q_1 - Q_2 = P (\tan \phi_1 - \tan \phi_2)$$
    *   Where $P$ is the active power in kW.

### Capacitor Formulas
*   **Capacitance Required:** $C = \frac{Q_C}{2\pi f V^2}$
    *   (Where $V$ is the voltage across the capacitor)

---

## Rotor Power Factor (Induction Motors)
*   $pf = \cos \phi = \frac{R_2}{Z_2} = \frac{R_2}{\sqrt{R_2^2 + (X_{2s} S)^2}}$
*   Ideally, motors should run at high efficiency and high power factor.

## Synchronous Motors for PFC
*   Synchronous motors can be over-excited to draw leading current, thereby acting as a synchronous condenser to improve the overall system power factor.
