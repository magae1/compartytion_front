import { Suspense } from "react";
import Link from "next/link";
import _ from "underscore";
import { Button, Paper, Skeleton, Stack } from "@mui/material";

import CompetitionList from "@/app/(main)/(account)/_components/CompetitionList";

export default function Page() {
  return (
    <>
      <Stack direction={"row"} my={1}>
        <Button
          component={Link}
          href={"/create-new-competition"}
          variant={"contained"}
        >
          새 대회 만들기
        </Button>
      </Stack>
      <Paper sx={{ minHeight: "calc(100vh - 250px)" }}>
        <Suspense
          fallback={
            <Stack>
              {_.range(6).map((n) => (
                <Skeleton
                  key={n}
                  variant={"rectangular"}
                  width={"100%"}
                  height={48}
                  sx={{
                    bgcolor: n % 2 == 1 ? "background.default" : undefined,
                  }}
                />
              ))}
            </Stack>
          }
        >
          <CompetitionList />
        </Suspense>
      </Paper>
    </>
  );
}
