# LAPLACE TRANSFORMS
Used to solve differential equations algebraically.
$$\mathcal{L}\{f(t)\} = F(s) = \int_0^\infty f(t)e^{-st} dt$$

### Common Laplace Transforms Table
| S.no | $f(t)$ | $\mathcal{L}\{f(t)\}$ | S.no | $f(t)$ | $\mathcal{L}\{f(t)\}$ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | $1$ | $\frac{1}{s}$ | 11 | $e^{at} \sinh bt$ | $\frac{b}{(s - a)^2 - b^2}$ |
| 2 | $e^{at}$ | $\frac{1}{s - a}$ | 12 | $e^{at} \cosh bt$ | $\frac{s - a}{(s - a)^2 - b^2}$ |
| 3 | $t^n$ | $\frac{n!}{s^{n+1}}$ | 13 | $t \cos at$ | $\frac{s^2 - a^2}{(s^2 + a^2)^2}$ |
| 4 | $\sin at$ | $\frac{a}{s^2 + a^2}$ | 14 | $t \sin at$ | $\frac{2as}{(s^2 + a^2)^2}$ |
| 5 | $\cos at$ | $\frac{s}{s^2 + a^2}$ | 15 | $f'(t)$ | $sF(s) - f(0)$ |
| 6 | $\sinh at$ | $\frac{a}{s^2 - a^2}$ | 16 | $f''(t)$ | $s^2F(s) - sf(0) - f'(0)$ |
| 7 | $\cosh at$ | $\frac{s}{s^2 - a^2}$ | 17 | $\int_0^t f(u) du$ | $\frac{1}{s}F(s)$ |
| 8 | $e^{at}t^n$ | $\frac{n!}{(s - a)^{n+1}}$ | 18 | $t^n f(t)$ | $(-1)^n \frac{d^n}{ds^n}\{F(s)\}$ |
| 9 | $e^{at} \cos bt$ | $\frac{s - a}{(s - a)^2 + b^2}$ | 19 | $\frac{1}{t}\{f(t)\}$ | $\int_s^\infty F(s) ds$ |
| 10 | $e^{at} \sin bt$ | $\frac{b}{(s - a)^2 + b^2}$ | 20 | $e^{at}f(t)$ | $F(s - a)$ |
