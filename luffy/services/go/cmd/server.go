package cmd

import (
	"github.com/idasilva/aws-serverless/luffy/services/app/modules"
	"github.com/spf13/cobra"
)

var serveCmd = &cobra.Command{
	Use:   "server",
	Short: "serve the api",
	RunE: func(cmd *cobra.Command, args []string) error {
		return modules.Application().Server()
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)
}
