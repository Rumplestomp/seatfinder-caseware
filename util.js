module.exports = {
  validateFname: fName => {
    /**
     * validates string to see if it contains a first and last name (alphabetical only, one space allowed)
     * Returns: an array containing first name, and last name, empty array if fName string not valid.
     * i.e.
     * validateFname('Charles Barkley')
     * >> [CCharles', 'Barkely']
     * 
     * validateFname('Ch4rl3s _- Barkley')
     * >> []
     */
    let names = fName.split(' ');
    names = names.filter(name => {
      // this regex checks for an alphabetical only string, with the exception of certain characters that appear in names, like ', - etc..
      return /^[a-zA-Z'-]+$/.test(name);
    });
    return names;
  },
  capitalizeFirstLetter: word => {
    return `${word[0].toUpperCase()}${word.toLowerCase().substring(1)}`;
  }
}
