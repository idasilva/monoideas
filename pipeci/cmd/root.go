package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

type rootCmd struct {
	cmd *cobra.Command
}

func (r *rootCmd) execute() {
	if err := r.cmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func newRootCmd() *rootCmd {
	root := &rootCmd{}
	cmd := &cobra.Command{
		Use:               "pipeci",
		Short:             "Make the necessary validation on ci phase",
		Long:              `Its a project to validate any language on ci phase`,
		SilenceUsage:      true,
		SilenceErrors:     true,
		Args:              cobra.NoArgs,
		ValidArgsFunction: cobra.NoFileCompletions,
	}

	cmd.AddCommand(
		newCheckCmd().cmd,
	)
	root.cmd = cmd
	return root
}

func Execute() { newRootCmd().execute() }
