package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

//const cfgFileName = ".ci-golang.yaml"
//
//var cfgFile string

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
	//cobra.OnInitialize(func() {
	//	if cfgFile == "" {
	//		cfgFile = cfgFileName
	//	}
	//
	//	viper.SetConfigFile(cfgFile)
	//
	//	if err := viper.ReadInConfig(); err != nil {
	//		logrus.WithError(err).Error("error reading the config file")
	//		return
	//	}
	//
	//	logrus.WithField("filename", viper.ConfigFileUsed()).Info("using config file...", viper.ConfigFileUsed())
	//})
	//
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
		newSyncCmd().cmd,
	)
	root.cmd = cmd
	return root
}

func Execute() { newRootCmd().execute() }
