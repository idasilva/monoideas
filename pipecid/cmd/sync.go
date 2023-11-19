package cmd

import (
	"fmt"
	"os"

	"github.com/idasilva/aws-serverless/pipecid/pkg/argocd"
	"github.com/spf13/cobra"
)

type Data struct {
	appName  string
	userName string
	password string
}

type syncCmd struct {
	cmd *cobra.Command
}

func (r *syncCmd) execute() {
	if err := r.cmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func newSyncCmd() *syncCmd {
	sync := &syncCmd{}
	data := &Data{}

	cmd := &cobra.Command{
		Use:           "sync",
		Aliases:       []string{"s"},
		Short:         "Sync the source of truth on kubernetes environmen",
		SilenceUsage:  true,
		SilenceErrors: true,
		Args:          cobra.ArbitraryArgs,
		PreRun: func(cmd *cobra.Command, args []string) {
			data.appName = cmd.PersistentFlags().Lookup("app-name").Value.String()
			data.userName = cmd.PersistentFlags().Lookup("argocd-name").Value.String()
			data.password = cmd.PersistentFlags().Lookup("argocd-password").Value.String()
		},
		RunE: func(cmd *cobra.Command, args []string) error {

			fmt.Println(fmt.Sprintf("Sync AppName: %v", data.appName))

			argocd.Login(data.userName, data.password)

			return nil
		},
	}

	sync.cmd = cmd
	sync.cmd.PersistentFlags().StringP("app-name", "a", "", "identify the source of truth")
	sync.cmd.PersistentFlags().StringP("argocd-name", "", "", "argocd name")
	sync.cmd.PersistentFlags().StringP("argocd-password", "", "", "argocd passord")
	return sync
}
