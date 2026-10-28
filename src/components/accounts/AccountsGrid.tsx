import Grid from "@mui/material/Grid";
import { useState } from "react";

import AccountCard from "../dashboard/AccountCard";
import AccountDetailsDialog from "./AccountDetailsDialog";

import type { Account } from "../../types/account";

interface Props {
  accounts: Account[];
}

export default function AccountsGrid({
  accounts,
}: Props) {

  const [selectedAccount, setSelectedAccount] =
    useState<Account | null>(null);

  return (
    <>

      <Grid container spacing={3}>
        {accounts.map((account) => (
          <Grid
            key={account.id}
            size={{ xs: 12, sm: 6, md: 4 }}
          >
            <div
              onClick={() => setSelectedAccount(account)}
              style={{ cursor: "pointer" }}
            >
              <AccountCard account={account} />
            </div>
          </Grid>
        ))}
      </Grid>

      <AccountDetailsDialog
        open={selectedAccount !== null}
        account={selectedAccount}
        onClose={() => setSelectedAccount(null)}
      />

    </>
  );
}