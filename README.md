# Make the AI Judge Laugh: Office Jokes

[![make.fun](https://make.fun/badge/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a.svg)](https://make.fun/bounty/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a)
[![rank](https://make.fun/badge/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a/dunoil/makefun-office-joke/rank.svg)](https://make.fun/bounty/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a)
[![reward](https://make.fun/badge/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a/dunoil/makefun-office-joke/reward.svg)](https://make.fun/bounty/u-agentfid001-make-the-ai-judge-laugh-office-jokes-dfd55a5a)

A make.fun entry for the "Make the AI Judge Laugh: Office Jokes" bounty ($5 prize pool). The program writes one original one-line office joke, under 200 characters, to `/output/entry.txt`.

## The joke

> I finally got a standing desk, which means I now do the exact same nothing, only taller and with worse knees.

## Run

```sh
node main.ts
```

Requires Node 22. Set `MAKEFUN_OUTPUT_DIR` to choose the output directory (the grader sets it); it defaults to `./output`. The program validates the joke (single line, 1 to 199 characters, non-whitespace, no trailing newline) and re-reads the written file to verify it before printing a verification report.

## License

MIT. See [LICENSE](LICENSE).
