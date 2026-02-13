# ELECTROMAGNETISM

## Electrostatic Field & Coulomb’s Law
*   **Force:** $F_{A/R} = \frac{q_1 q_2 k}{d^2}$
*   **Field Strength / Voltage Gradient:** $E = \frac{F}{q} = \frac{V}{d}$
*   **Permittivity of free space:** $\epsilon_o = 8.85 \times 10^{-12} C^2 / Nm^2$

## Capacitors
*   **Capacitance:** $C = \epsilon_0 \epsilon_r \frac{A}{d} = \frac{Q}{V}$ (in Farads)
*   **Energy Stored:** $E = \frac{1}{2} CV^2$
*   **Multiple Plates:** $C = (n - 1) \frac{\epsilon_0 \epsilon_r A}{d}$
*   **Multiple Dielectrics:** $C = \frac{\epsilon_0 A}{\sum d/\epsilon_r}$

---

## MAGNETIC CIRCUITS

### Magnetising Force (H) Produced by Electric Current

**Magnetomotive Force (m.m.f):**
$$m.m.f. = N \times I \quad \text{in A-turns}$$

**Magnetizing Force (H), (or magnetic field strength):**
$$H = \frac{N \times I}{\ell} \quad \text{in A-turns/m}$$

### Force on a Current-Carrying Wire in a Magnetic Field
$$F = BIL \sin \theta$$

### Torque on a Current-Carrying Coil
$$T = BINA \cos \theta$$

### Force Between Two Current-Carrying Wires
> If currents are in the same directions, the conductors **attract** each other; if currents are in opposite directions, the conductors **repel** each other.

$$F = \frac{2 I_1 I_2 \ell}{d} \times 10^{-7} \text{ N}$$

### Magnetic Field
1. The direction of magnetic lines of force is from N-pole to the S-pole outside the magnet.
2. They form a closed loop.
3. Their tendency is to follow the least reluctance path.
4. They act like stretched cords, always trying to shorten themselves.
5. Never intersect.
6. They repel each other when they are parallel and are in the same direction.
7. Unaffected by non-magnetic materials.

**Magnetic Flux Density, B:**
$$B = \frac{\phi}{A} \quad \text{in Wb/m}^2 \text{ or T}$$

### Magnetic Circuit
The closed path followed by magnetic flux.

*   **Magnetomotive force**: $mmf = N \times I$
*   **Reluctance**: $S = \frac{\ell}{A \mu_0 \mu_r}$
*   **Permeance**: $P = \frac{1}{S}$
*   **Magnetic Flux**: $\phi = \frac{mmf}{S} = \frac{NI}{\frac{\ell}{A \mu_0 \mu_r}}$
*   **Ampere-Turns**: $NI = \frac{B \ell}{\mu_0 \mu_r} = H \ell$

> **Notes:**
> *   $S$ is small for magnetic materials since $\mu_r$ is large.
> *   $S$ is large for non-magnetic materials since $\mu_r = 1$.
> *   $1 \text{ Wb} = 10^8 \text{ Mx} = 1 \text{ Tm}^2$

### Magnetic versus Electric Circuits (Similarities)

| No. | Magnetic Circuit | Electric Circuit |
| :--- | :--- | :--- |
| 1 | The closed path for magnetic flux is called magnetic circuit. | The closed path for electric current is called electric circuit. |
| 2 | Flux = mmf / reluctance | Current = emf / resistance |
| 3 | Flux, $\phi$ in Wb | Current, $I$ in ampere |
| 4 | mmf in AT | emf in V |
| 5 | Reluctance, $S = \frac{\ell}{a\mu} = \frac{\ell}{a\mu_0\mu_r}$ AT/WB | Resistance, $R = \rho \frac{\ell}{a} \Omega$ or $R = \frac{1}{\sigma} \frac{\ell}{a} \Omega$ |
| 6 | Permeance = 1 / reluctance | Conductance = 1 / resistance |
| 7 | Permeability, $\mu$ | Conductivity, $\sigma = 1/\rho$ |
| 8 | Reluctivity | Resistivity |
| 9 | Flux density, $B = \frac{\phi}{a}$ Wb/m² | Current density, $J = \frac{I}{a}$ A/m² |
| 10 | Magnetic intensity, $H = NI/\ell$ | Electric intensity, $E = V/d$ |

### RELUCTANCE IN SERIES
$$S = S_1 + S_2 + S_3 + \dots + S_n$$
$$S = \sum \frac{\ell}{A \mu_0 \mu_r}$$
$$mmf_T = S \times \phi = \sum H \ell$$

### RELUCTANCE IN PARALLEL
$$S = (S_1^{-1} + S_2^{-1} + \dots + S_n^{-1})^{-1}$$
$$\phi = \phi_1 + \phi_3 = \dots = \phi$$
$$mmf_T = S \times \phi$$

### AIR LEAKAGE
The flux that does not follow the desired path in a magnetic circuit.

*   **Leakage**: $\phi_{leakage} = \phi_i - \phi_g$
*   **Leakage Coeff**: $\lambda = \frac{\phi_i}{\phi_g}$
*   **mmf**: $mmf = \frac{d_g \phi_g}{\mu_0}$

### B-H Curve (Magnetisation)
*   $\mu_r$ for magnetic materials is dependent on magnetic flux density, B.
*   B-H curve for non-magnetic materials is linear because $B = \mu_0 H$.

### Magnetic Hysteresis
Lagging of flux density (B) behind the magnetizing force (H) in a magnetic material subjected to cycles of magnetization.

$$P_{hys} = V \times A \times xy \times f$$

*   $x = \frac{Wb/m^2}{cm}$
*   $y = \frac{AT/m}{cm}$
*   $V = \text{volume, m}^3$
*   $f = \text{frequency of magnetisation}$

### Steinmetz Hysteresis Law
The area of hysteresis loop of a magnetic material is directly proportional to 1.6 the power of the maximum B.

$$P_{hys} = \eta \times B_{max}^{1.6} \times V \times f$$

*   $\eta = \text{hysteresis coeff.}$

---

# ELECTROMAGNETIC INDUCTION

In 1831, **Michael Faraday** demonstrated that when the magnetic flux linking a conductor changes, an e.m.f. is induced in the conductor.

### Principles of Induction
i) No change in flux, no e.m.f. induced in the coil.
ii) The conductors (or coils) are moved through a stationary magnetic field as is the case with d.c. generators.
iii) The conductors are stationary and the magnetic field is moving as is the case with a.c. generators.
iv) The e.m.f. and hence current in the conductors (or coils) will persist so long as the magnetic flux linking them is changing.

$$e \propto \frac{d}{dt}(N \times \phi)$$

### Faraday’s Law of Electromagnetic Induction
*   **First Law:** When the magnetic flux linking a conductor or coil changes, an e.m.f. is induced in it.
*   **Second Law:** The e.m.f. induced in a conductor or coil is directly proportional to the rate of change of flux linkages.

$$e = -N \frac{d\phi}{dt}$$

> **Lenz' Law:** The current proceeds in a direction so as to oppose the field that causes it.

### Dynamically and Statically Induced E.M.F.
*   **Dynamically Induced (Conductor is moved, B is stationary):**
    Straight wire: $e = B \ell v \sin \theta$
*   **Statically Induced (Conductor is stationary, B is moved):**
    Includes self-induced emf and mutually-induced emf.

## SELF INDUCTANCE
$$e = L \frac{dI}{dt}$$

*   $L = \frac{e}{dI/dt}$
*   $L = \frac{Nd\phi}{dI}$
*   $L = \frac{N^2}{S}$

> **Unit of L:** H (Henry)

## MUTUAL INDUCTANCE
$$e_M = M \frac{dI_1}{dt}$$

*   $M = \frac{e}{dI_1/dt}$
*   $M = \frac{N_2 d\phi_{12}}{dI_1}$
*   $M = \frac{N_1 N_2}{S}$

### Coupling Coefficient (k):
$$k = \frac{\text{actual M}}{\text{max. M}} = \frac{M}{\sqrt{L_1 L_2}}$$

## INDUCTANCES IN SERIES

*   **Series Aiding:** $L_T = L_1 + L_2 + 2M$
*   **Series Opposing:** $L_T = L_1 + L_2 - 2M$

## INDUCTANCES IN PARALLEL

*   **Parallel (no mutual inductance):** $\frac{1}{L_T} = \frac{1}{L_1} + \frac{1}{L_2} + \dots + \frac{1}{L_n}$
*   **Parallel (with mutual inductance):** $L_T = \frac{L_1 L_2 - M^2}{L_1 + L_2 \pm 2M}$

## ENERGY IN A MAGNETIC FIELD

*   **Energy Stored in an M.F.:** $E = \frac{1}{2}(L_1 + L_2 \pm 2M) I^2$
*   **Voltage Equation:** $V = IR + L \frac{dI}{dt}$
