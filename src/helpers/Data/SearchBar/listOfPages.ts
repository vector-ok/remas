import { Routes } from "../../../routes/routes.constants"

export interface SearchPageItem {
  name: string
  url: string
}

export const listOfPages: SearchPageItem[] = [
  {
    name: "Home",
    url: Routes.DASHBOARD,
  },

  // {
  // name: "Payments",
  // url: "/payments/make",
  // },

  {
    name: "Send Money",
    url: "/payments/make",
  },

  {
    name: "Single Transfer",
    url: "/payments/make/single",
  },
  {
    name: "Transfer Between Account",
    url: "/payments/make/accounts",
  },
  {
    name: "Bulk Transfer",
    url: "/payments/make/bulk",
  },
  {
    name: "Pending Payments",
    url: "/payments/pending",
  },
  {
    name: "Transactions",
    url: "/transactions",
  },

  {
    name: "People",
    url: "/people",
  },

  {
    name: "Accounts",
    url: "/accounts",
  },

  {
    name: "Account Balance Instructions",
    url: "/accounts",
  },

  {
    name: "Account Restrictions",
    url: "/settings/account",
  },

  {
    name: "Account Rules",
    url: "/settings/account",
  },

  {
    name: "Accounts",
    url: "/accounts",
  },

  {
    name: "Download Account Details",
    url: "/accounts",
  },

  {
    name: "User Permissions",
    url: "/accounts",
  },

  {
    name: "Account Setting",
    url: "/settings/account",
  },

  {
    name: "Team Members",
    url: "/settings/teammembers",
  },

  {
    name: "Add Team Member",
    url: "/settings/teammembers",
  },

  {
    name: "Remove Team Member",
    url: "/settings/teammembers",
  },

  {
    name: "Security",
    url: "/settings/security",
  },

  {
    name: "Change Password",
    url: "/settings/security",
  },

  {
    name: "Lenco Token App",
    url: "/settings/security",
  },
]
