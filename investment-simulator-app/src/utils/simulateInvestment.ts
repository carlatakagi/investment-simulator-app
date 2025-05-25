// Cálculo da Poupança (rendimento de 0.5% ao mês + taxa referencial)
export function calculatePoupanca(initialAmount: number, monthlyAmount: number, periodInMonths: number) {
  const monthlyRate = 0.005 // 0.5% ao mês
  let balance = initialAmount
  let totalInvested = initialAmount
  const monthlyBreakdown = []

  for (let month = 1; month <= periodInMonths; month++) {
    // Adiciona o aporte mensal
    if (month > 1) {
      balance += monthlyAmount
      totalInvested += monthlyAmount
    }

    // Calcula o rendimento do mês
    const monthlyInterest = balance * monthlyRate
    balance += monthlyInterest

    monthlyBreakdown.push({
      month,
      invested: month === 1 ? initialAmount : monthlyAmount,
      interest: monthlyInterest,
      balance,
    })
  }

  const totalInterest = balance - totalInvested

  return {
    totalInvested,
    totalInterest,
    finalAmount: balance,
    monthlyBreakdown,
  }
}

// Cálculo do CDB (baseado na taxa CDI)
export function calculateCDB(
  initialAmount: number,
  monthlyAmount: number,
  periodInMonths: number,
  cdiAnnualRate: number,
  cdbPercentageOfCDI: number,
) {
  // Converte taxa anual para mensal
  // biome-ignore lint/style/useExponentiationOperator: <explanation>
  const cdiMonthlyRate = Math.pow(1 + cdiAnnualRate / 100, 1 / 12) - 1
  const effectiveMonthlyRate = cdiMonthlyRate * (cdbPercentageOfCDI / 100)

  let balance = initialAmount
  let totalInvested = initialAmount
  const monthlyBreakdown = []

  for (let month = 1; month <= periodInMonths; month++) {
    // Adiciona o aporte mensal
    if (month > 1) {
      balance += monthlyAmount
      totalInvested += monthlyAmount
    }

    // Calcula o rendimento do mês
    const monthlyInterest = balance * effectiveMonthlyRate
    balance += monthlyInterest

    monthlyBreakdown.push({
      month,
      invested: month === 1 ? initialAmount : monthlyAmount,
      interest: monthlyInterest,
      balance,
    })
  }

  // Aplica o IR
  // Até 6 meses: 22.5%
  // De 6 a 12 meses: 20%
  // De 12 a 24 meses: 17.5%
  // Acima de 24 meses: 15%
  let taxRate = 0.225
  if (periodInMonths > 24) {
    taxRate = 0.15
  } else if (periodInMonths > 12) {
    taxRate = 0.175
  } else if (periodInMonths > 6) {
    taxRate = 0.2
  }

  const totalInterest = balance - totalInvested
  const taxAmount = totalInterest * taxRate
  const netInterest = totalInterest - taxAmount
  const finalAmount = totalInvested + netInterest

  return {
    totalInvested,
    totalInterest: netInterest,
    finalAmount,
    monthlyBreakdown,
    taxInfo: {
      taxRate: taxRate * 100,
      taxAmount,
    },
  }
}

// Cálculo do Tesouro Direto (baseado na taxa SELIC)
export function calculateTesouroDireto(
  initialAmount: number,
  monthlyAmount: number,
  periodInMonths: number,
  selicAnnualRate: number,
) {
  // Converte taxa anual para mensal
  // biome-ignore lint/style/useExponentiationOperator: <explanation>
    const selicMonthlyRate = Math.pow(1 + selicAnnualRate / 100, 1 / 12) - 1

  let balance = initialAmount
  let totalInvested = initialAmount
  const monthlyBreakdown = []

  for (let month = 1; month <= periodInMonths; month++) {
    // Adiciona o aporte mensal
    if (month > 1) {
      balance += monthlyAmount
      totalInvested += monthlyAmount
    }

    // Calcula o rendimento do mês
    const monthlyInterest = balance * selicMonthlyRate
    balance += monthlyInterest

    monthlyBreakdown.push({
      month,
      invested: month === 1 ? initialAmount : monthlyAmount,
      interest: monthlyInterest,
      balance,
    })
  }

  // Aplica o IR
  let taxRate = 0.225
  if (periodInMonths > 24) {
    taxRate = 0.15
  } else if (periodInMonths > 12) {
    taxRate = 0.175
  } else if (periodInMonths > 6) {
    taxRate = 0.2
  }

  // Taxa de custódia da B3 (0.2% ao ano sobre o valor total)
  const custodyFeeAnnual = 0.002
  const custodyFeeMonthly = custodyFeeAnnual / 12
  let totalCustodyFee = 0

  for (let month = 1; month <= periodInMonths; month++) {
    totalCustodyFee += monthlyBreakdown[month - 1].balance * custodyFeeMonthly
  }

  const totalInterest = balance - totalInvested
  const taxAmount = totalInterest * taxRate
  const netInterest = totalInterest - taxAmount - totalCustodyFee
  const finalAmount = totalInvested + netInterest

  return {
    totalInvested,
    totalInterest: netInterest,
    finalAmount,
    monthlyBreakdown,
    taxInfo: {
      taxRate: taxRate * 100,
      taxAmount,
      custodyFee: totalCustodyFee,
    },
  }
}
