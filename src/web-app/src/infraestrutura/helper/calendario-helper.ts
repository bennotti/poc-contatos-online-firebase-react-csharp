export class CalendarioHelper {
  static QuantidadeSemanasAno(ano: number): number | null {
    const dataInicioAno = new Date(`${ano}-01-01`);
    const dataFinalAno = new Date(`${ano}-12-31`);
    const numeroSemanas = Math.ceil((dataFinalAno.getTime() - dataInicioAno.getTime()) / (7 * 24 * 60 * 60 * 1000));
    return numeroSemanas;
  }
  static formatarDataPtBR(value?: Date | string) {
    if (!value || value == '') {
      return '';
    }
    return new Date(value as Date).toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    });
  }
}
