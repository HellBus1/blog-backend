interface JwtResponse {
  valid: boolean;
  expired: boolean;
  decoded: any;
}

export { JwtResponse }