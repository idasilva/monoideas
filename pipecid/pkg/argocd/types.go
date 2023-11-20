package argocd

type GitOps interface {
	Login(username, password string)
	Sync(appName string)
	Wait()
}
