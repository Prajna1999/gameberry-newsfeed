{ pkgs }: {
	deps = [
		pkgs.docker
  pkgs.libcap
  pkgs.sudo
  pkgs.nodejs-18_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.replitPackages.jest
	];
}