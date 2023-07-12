import store from "../features/store"

export default function doesUserHaveAccessToAccount(
  _id: string | undefined,
): boolean {
  if (!_id) {
    return false
  }
  const userAccountsMeta =
    store.getState().init.main?.companyDetails.userAccountsMeta

  const userAccountMeta = userAccountsMeta?.find(
    (_meta) => _meta.userAccountId === _id,
  )

  if (userAccountMeta) {
    return userAccountMeta.canInitiate()
  }

  return false
}
