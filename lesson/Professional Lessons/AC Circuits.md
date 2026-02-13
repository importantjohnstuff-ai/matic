# AC CIRCUITS

## POLYPHASE AC SYSTEMS

### 1-Φ PHASE AC
The instantaneous voltage for a single-phase system is given by:
$$V = V_m \sin(2\pi ft)$$

### 3-Φ PHASE AC
In a balanced three-phase system, the voltages are displaced by 120°:
*   $V_R = V_m \sin(2\pi ft)$
*   $V_Y = V_m \sin(2\pi ft - 120^\circ)$
*   $V_B = V_m \sin(2\pi ft + 120^\circ)$

**Advantages of Three-Phase Systems:**
1.  Instantaneous power is **constant at all times**.
2.  Output is greater than that of a single-phase system.
3.  Transmission and distribution are **cheaper**.
4.  Motors are more efficient and have **higher power factors**.
5.  Motors are **self-starting**.

### Nomenclature and Definitions
*   $V_P$ = phase voltage (voltage per winding)
*   $V_L$ = line voltage (voltage per terminal pairs)
*   $I_P$ = phase current (current per winding)
*   $I_L$ = line current (current per terminal pairs)

**A System is Balanced IF:**
*   Voltages are equal in magnitude and differ by **120°**.
*   Currents are equal in magnitude and differ by **120°**.

### Connections

**Star or Wye (Y) Connection**
*   **Line Voltage:** $V_L = \sqrt{3}V_P$ (Line voltages lead phase voltages by 30°)
*   **Line Current:** $I_L = I_P$
*   **Active Power:** $P = 3(I_P V_P) \cos \phi = \sqrt{3}(I_L V_L) \cos \phi$
*   **Apparent Power:** $S = 3(I_P V_P) = \sqrt{3}(I_L V_L)$
*   **Reactive Power:** $Q = 3(I_P V_P) \sin \phi = \sqrt{3}(I_L V_L) \sin \phi$

**Delta (Δ) or Mesh Connection**
*   **Line Voltage:** $V_L = V_P$
*   **Line Current:** $I_L = \sqrt{3}I_P$ (Line currents lag phase currents by 30°)
*   **Active Power:** $P = 3(I_P V_P) \cos \phi = \sqrt{3}(I_L V_L) \cos \phi$
*   **Apparent Power:** $S = 3(I_P V_P) = \sqrt{3}(I_L V_L)$
*   **Reactive Power:** $Q = 3(I_P V_P) \sin \phi = \sqrt{3}(I_L V_L) \sin \phi$

### Balanced Y/Δ and Δ/Y Conversions
For balanced loads:
*   $Z_Y = \frac{1}{3} \times Z_\Delta$
*   $P_Y = \frac{1}{3} \times P_\Delta$

### Measurement of Three-Phase Power

**Methods:**
1.  **Three-wattmeter method:** $P = W_1 + W_2 + W_3$
2.  **Two-wattmeter method:** $P = W_1 + W_2$
    *   $W_1 + W_2 = \sqrt{3} I_L V_L \cos \phi$
    *   Reactive Power: $Q = \sqrt{3}(W_1 - W_2)$
    *   $\phi = \tan^{-1} \left( \sqrt{3} \frac{W_1 - W_2}{W_1 + W_2} \right)$
3.  **One-wattmeter method:** (For balanced loads only)
    *   $W_1 = V_L I_L \sin \phi$
    *   $P = 3 I_P V_P \cos \phi$

---

## TRANSIENT AC CIRCUITS

| Circuit | Input | $\delta$ | Instantaneous Current |
| :--- | :--- | :--- | :--- |
| **RL** | $E = E_m \sin(\omega t + \phi)$ <br> $Z = \sqrt{R^2 + X_L^2}$ | $\delta = \tan^{-1} \left( \frac{\omega L}{R} \right)$ | $I = \frac{E_m}{Z} \sin(\omega t + \phi - \delta) - \frac{E_m}{Z} \sin(\phi - \delta) e^{-\frac{R}{L}t}$ |
| **RC** | $E = E_m \sin(\omega t + \phi)$ <br> $Z = \sqrt{R^2 + X_C^2}$ | $\delta = \tan^{-1} \left( \frac{1}{\omega RC} \right)$ | $I = \frac{E_m}{Z} \sin(\omega t + \phi + \delta) + \left( \frac{E \sin \phi}{R} - \frac{E_m}{Z} \sin(\phi + \delta) \right) e^{-\frac{t}{RC}}$ |

### TRANSIENT AC CIRCUITS - RLC

| CASES | Discriminant | Current |
| :--- | :--- | :--- |
| **Overdamped** | $\left( \frac{R}{L} \right)^2 - \frac{4}{LC} > 0$ | $I = Ae^{D_1t} + Be^{D_2t} + I_m \sin(\omega t + \phi + \delta)$ |
| **Critically Damped** | $\left( \frac{R}{L} \right)^2 - \frac{4}{LC} = 0$ | $I = (A + Bt)e^{-Rt/2L} + I_m \sin(\omega t + \phi + \delta)$ |
| **Underdamped** | $\left( \frac{R}{L} \right)^2 - \frac{4}{LC} < 0$ | $I = e^{\alpha t} (A \cos \beta t + B \sin \beta t) + I_m \sin(\omega t + \phi + \delta)$ |

**Parameters:**
*   $\alpha = -\frac{R}{2L}$
*   $\beta = \frac{\sqrt{\frac{4}{LC} - \left( \frac{R}{L} \right)^2}}{2}$
*   $Z = \sqrt{R^2 + (X_L - X_C)^2}$
*   $\delta = \tan^{-1} \left( \frac{|X_L - X_C|}{R} \right)$
