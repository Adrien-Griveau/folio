{ pkgs ? import <nixpkgs> {} }:
pkgs.mkDerivation {
  name = "my-project-fonts";
  src = pkgs.fetchurl {
    url = "https://github.com/your-username/your-repo/archive/refs/heads/main.zip";
    sha256 = "YOUR_SHA256_HASH";
  };
  unpack = true;
  buildPhase = ''
    cp -r ${src}/your-repo-main/fonts .
  '';
}