import sys

def main():
   _, a, b = sys.argv
   sum = float(a) + float(b)
   message = str(sum)
   sys.stdout.write(message)
# end def

main()
