import { Suspense } from "react";
import _ from "underscore";
import { Paper, Skeleton, Stack } from "@mui/material";

import CompetitionList from "@/app/(account)/_components/CompetitionList";

export default function Page() {
  return (
    <Paper sx={{ minHeight: "calc(100vh - 200px)" }}>
      <Suspense
        fallback={
          <Stack>
            {_.range(6).map((n) => (
              <Skeleton
                key={n}
                variant={"rectangular"}
                width={"100%"}
                height={48}
                sx={{ bgcolor: n % 2 == 1 ? "background.default" : undefined }}
              />
            ))}
          </Stack>
        }
      >
        <CompetitionList />
      </Suspense>
    </Paper>
  );
}
