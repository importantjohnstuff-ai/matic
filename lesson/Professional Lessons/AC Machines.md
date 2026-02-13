# AC MACHINERY

## ALTERNATORS

- As the reverse of the DC generator, the **armature winding is stationary** while the **field winding is rotating (rotor)**.

### ROTOR WINDING
- The number of poles ranges from 10–20 in order to reduce the required speed/EMF induced.
- Excitation usually occurs at 250 or 125 V DC.

### STATOR WINDING
- Consists of full pitched and short pitched coils.
- Key concepts include Pole pitch, Slot pitch, and Phase spread.

### EMF per Phase of an Alternator (AC Generator)
An alternator is a power machine that converts mechanical energy to AC.

**Fundamental Equation**
$$E = 2.22 k_f k_c k_d Z \Phi f$$
*(Note: Where B·A is often represented as flux $\Phi$)*

- **Z**: No. of conductors per phase ($Z = 2 \times \text{turns}$)
- **Coil span factor ($k_c$):**
  $$k_c = \cos\left(\frac{\alpha}{2}\right)$$
  - Chording $\angle$: $\alpha = 180^\circ \times \left(\frac{\text{slots shorted/pole}}{\text{slots/pole}}\right)$
- **Distribution factor ($k_d$):**
  $$k_d = \frac{\sin(m\beta/2)}{m\sin(\beta/2)}$$
  - Pitch $\angle$: $\beta = \frac{180^\circ}{\text{slots/pole}}$
  - Phase spread: $m = \text{slots/phase/pole}$

### Equivalent Circuit for Alternators
$$E_p \angle \pm \delta = V_p \angle 0^\circ + (I_p \angle \mp \theta)(R_a \pm j X_s)$$

- **$\delta$**: Angle between $E_p$ and $V_p$
- **$E_p$**: EMF generated per phase
- **$V_p$**: Voltage loading per phase
- **$I_p$**: Armature current per phase
- **$R_a$**: Armature winding resistance
- **$X_s$**: Synchronous reactance
- **$\theta$**: Angle between $E_p$ and $I_p$
  - $+\theta$: Leading
  - $-\theta$: Lagging

### Performance Formulas

**Voltage Regulation**
$$\%VR = \frac{E_p - V_p}{V_p} \times 100$$

**Power Calculations**
- **Power Developed ($P_m$):**
  $$P_m = \frac{E_p V_p}{X_s} \sin \delta = \frac{2\pi T N_s}{60}$$
- **Power Loss ($P_{\text{loss}}$):**
  $$P_{\text{loss}} = P_{Cu} + P_{f/w} + P_i$$
- **Power Output ($P_{\text{out}}$):**
  $$P_{\text{out}} = 3 V_L I_L pf$$
- **Copper Loss ($P_{Cu}$):**
  $$P_{Cu} = 3 I_p^2 R_a x^2$$
  *(Where $x$ is the fraction of loading. Remove the multiplier 3 and $\sqrt{3}$ for single-phase alternators!)*

---

## INDUCTION MOTORS

### INDUCTION MOTORS: CONSTRUCTION
Due to the source current from the source, a revolving magnetic field (RMF) is induced by the stator which induces current in the rotor and produces a field along the rotor conductors.

### INDUCTION MOTORS: TORQUE
* The rotor will always rotate less than the stator RPM in order to produce TORQUE on the rotor conductors (SLIP).
* No slip, no EMF, no current, no torque.

#### SLIP
Speed of rotor < synchronous speed

*   $\%S = \frac{N_s - N}{N_s}$
*   Slip Speed $= N_s - N$

### INDUCTION MOTORS: SLIP & ROTOR CURRENT
**SLIP:** $S = \frac{N_s - N}{N_s}$

**FREQUENCY OF ROTOR CURRENTS:**
*   $f_r = \frac{(N_s - N) \times p}{120} = S \times f$
*   Slip Speed $= N_s - N$

**ROTOR EMF:**
*   Rotor-induced emf $= E$
*   $E = 4.44 k_c k_d N B A f_r$
*   $E = 4.44 k_c k_d N B A (f S)$

**Rotor Current:**
*   $X_2 = S X_{2s}$
*   $X_{2s}$ is stand-still reactance. At stand still, EMF is maximum hence the rotor field.

### INDUCTION MOTORS: ROTOR CIRCUIT
**ROTOR IMPEDANCE:**
*   $\bar{Z_2} = R_2 + j X_{2s} S$
*   $Z_2 = \sqrt{R_2^2 + (X_{2s} S)^2}$

**Induced emf:** $E_2 = S E_{2s}$

**Rotor Current:** $I_2 = \frac{E_2}{Z_2} = \frac{S E_{2s}}{\sqrt{R_2^2 + (X S)^2}}$

**Rotor pf:**
*   $pf = \cos \phi = \frac{R_2}{Z_2} = \frac{R_2}{\sqrt{R_2^2 + (X_{2s} S)^2}}$
*   $pf = \cos \phi = \frac{R_2}{Z_2} = \frac{R_2 / S}{\sqrt{(R_2 / S)^2 + X_2^2}}$

**Note:**
*   $X_{2L} = 2 \pi f_r L_2 = 2 \pi (f S) L_2$
*   At stand still, $S = 1$
*   At any $N$, $X_{2L} = S X_{2s}$
*   $R_2 (\frac{1-S}{S}) =$ rotor electrical load

### POWER FLOW DIAGRAM
1.  **Input power (Elect.)**
2.  $\rightarrow$ Stator copper loss / Stator iron loss
3.  $\rightarrow$ **Stator output = Rotor input**
4.  $\rightarrow$ Rotor copper loss
5.  $\rightarrow$ **Mech. power developed in rotor**
6.  $\rightarrow$ Mech. losses (friction/windage)
7.  $\rightarrow$ **Rotor output at shaft (Mech.)**

**Equations:**
*   Total Rotor Power: $P_2 = \frac{1}{S} I_2^2 R_2$
*   Rotor Copper Loss: $P_{Cu,2} = I_2^2 R_2$
*   Rotor Mechanical Power: $P'_2 = (\frac{1-S}{S}) I_2^2 R_2$
*   Rotor Efficiency: $\eta_R = 1 - S$

**Motor Efficiency:**
*   $\eta_M = \frac{P'_2}{P_1} \times 100$
*   $P'_1 = P_1 + P_{Cu,1} + P_{i,1}$
*   $P_1 = P_2$
*   $P_2 = P_{Cu,2} + P'_2$
*   $P'_2 = P_{windage} + P_{friction}$

### I.M. TORQUE
$T_{FL} = \frac{3(60)}{2 \pi N_s} \times \frac{S E_2^2 R_2}{R_2^2 + (S X_2)^2}$

**Ratios:**
*   $\frac{T_{FL}}{T_{max}} = \frac{2aS}{a^2 + S^2}$
*   $\frac{T_S}{T_{max}} = \frac{2a}{a^2 + 1}$
*   At $T_{max}, S = a$
*   $a = \frac{R_2}{X_2}$

---

## SYNCHRONOUS MOTOR

*   A synchronous machine can be operated as a generator or as a motor.
*   The torque produced in a 3-phase synchronous motor is not unidirectional and as such this motor is **not self-starting.**

### CALCULATIONS: SYNCHRONOUS MOTORS
*   Internal $\angle : \theta = \tan^{-1}(\frac{X_s}{R_a})$
*   Torque $\angle = \delta$
*   $E \angle \delta = V \angle 0 - (I \angle \mp \phi)(R_a + j X_s)$

**Power Calculations:**
*   If $R_a \neq 0$: $P_{mech} = 3 [\frac{VE}{Z_s} \cos(\theta - \delta) - \frac{E^2}{Z_s^2} R_a]$
*   If $R_a = 0$: $P_{in} = P_{mech} = -3 \frac{VE}{Z_s} \sin(\delta)$

### POWER FLOW: SYNCHRONOUS MOTORS
1.  **Input (Elect. Power)**
2.  $\rightarrow$ Copper losses
3.  $\rightarrow$ **Electrical power input - Copper loss = Mechanical Power developed**
4.  $\rightarrow$ Iron losses + Mechanical losses
5.  $\rightarrow$ **Mechanical Power Developed - Iron loss - Mechanical loss = Mechanical power output ($\omega T_m$)**

**Equations:**
*   $P_{mech} = P_{in} - P_{Cu}$
*   $P_{out} = P_{mech} - P_i - P_{fw}$
*   $P_{out} = P_{in} - P_i - P_{Cu} - P_{fw}$
*   $\eta = \frac{P_{out}}{P_{in}}$

### Tesla SynRM
**SynRM (Synchronous Reluctance Motor)** operates under very high reluctance of the laminated rotor with curved grooves based on the magnetic field pathway. Hence, it magnetically locks the stator and rotor system.
