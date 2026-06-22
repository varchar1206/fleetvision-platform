export function compareEtaToCommitment(
  etaValue: string | null | undefined,
  dispatchDate: string | null | undefined,
  commitmentTime: string | null | undefined
) {
  if (!etaValue || !dispatchDate || !commitmentTime) return "UNKNOWN";

  const eta = new Date(etaValue);
  const commitment = new Date(`${dispatchDate}T${commitmentTime}:00`);

  if (Number.isNaN(eta.getTime()) || Number.isNaN(commitment.getTime())) {
    return "UNKNOWN";
  }

  const minutesUntilCommitment =
    (commitment.getTime() - eta.getTime()) / 60000;

  if (eta > commitment) return "LATE";
  if (minutesUntilCommitment <= 30) return "AT_RISK";

  return "ON_TIME";
}
