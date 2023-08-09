package cmd

import (
	"fmt"
	"github.com/idasilva/aws-serverless/luffy/services/app/modules"
	"github.com/spf13/cobra"
)

// versionCmd represents the version command
var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "Print the version number of generated code example",
	Long:  `All software has versions. This is generated code example`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Build Date:", modules.BuildDate)
		fmt.Println("Git Commit:", modules.GitCommit)
		fmt.Println("Version:", modules.Version)
		fmt.Println("Go Version:", modules.GoVersion)
		fmt.Println("OS / Arch:", modules.OsArch)
	},
}

func init() {
	rootCmd.AddCommand(versionCmd)
}
